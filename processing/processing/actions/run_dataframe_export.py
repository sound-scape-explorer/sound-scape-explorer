from pandas import DataFrame

from processing.common.AggregatedLabelStorage import AggregatedLabelStorage
from processing.common.AggregatedReducible import AggregatedReducible
from processing.config.files.FileSheet import FileSheet
from processing.context import Context
from processing.new.AggregatedManager import AggregatedManager
from processing.new.ReducedManager import ReducedManager
from processing.new.ReducerConfigNew import ReducerConfigNew
from processing.new.iterate_reducers import iterate_reducers
from processing.utils.ask_band import ask_band
from processing.utils.ask_csv_path import ask_csv_path
from processing.utils.ask_extractor import ask_extractor
from processing.utils.ask_integration import ask_integration
from processing.utils.convert_timestamp_to_date import convert_timestamp_to_date
from processing.utils.print_action import print_action
from processing.utils.validate_configuration import validate_configuration


@validate_configuration
def run_dataframe_export(context: Context):
    print_action("Export started", "start")

    raw: dict[str, list[str]] = {}

    band = ask_band(context)
    integration = ask_integration(context)
    extractor = ask_extractor(context)
    csv_path = ask_csv_path(context)

    aggregated = AggregatedManager.from_storage(
        context,
        band,
        integration,
        extractor,
    )

    # indices
    raw["indices"] = []
    for i, _ in enumerate(aggregated.timestamps):
        raw["indices"].append(str(i))

    # sites
    raw["sites"] = [s[0] for s in aggregated.sites]

    # timestamps
    raw["timestamps"] = [convert_timestamp_to_date(t[0]) for t in aggregated.timestamps]

    # labels
    reducible = AggregatedReducible(band, integration, extractor)
    labels = AggregatedLabelStorage.read_from_storage(context, reducible)

    for al in labels:
        key = f"{FileSheet.label_prefix.value}{al.property}"
        raw[key] = al.values

    # reduced
    reducers = context.config.reducers
    reducers_filtered: list[ReducerConfigNew] = list(
        filter(
            lambda lambda_reducer: lambda_reducer.band == band
            and lambda_reducer.integration == integration
            and lambda_reducer.extractor == extractor,
            reducers,
        )
    )

    for r in iterate_reducers(reducers_filtered):
        reduced = ReducedManager.from_storage(
            context=context,
            band=r.band,
            integration=r.integration,
            extractor=r.extractor,
            reducer=r.reducer,
        )

        for d in range(r.reducer.dimensions):
            elements = [
                str(r.reducer.index),
                r.reducer.impl.name,
                f"{r.reducer.dimensions}d",
                f"{d+1}",
            ]
            key = "_".join(elements)
            raw[key] = [f[d] for f in reduced]

    # aggregated
    for index in range(aggregated["data"].shape[1]):
        elements = [str(extractor.index), extractor.name, f"{index+1}"]
        key = "_".join(elements)
        raw[key] = [d[index] for d in aggregated["data"]]

    df = DataFrame(raw)
    df.to_csv(csv_path, index=False)

    print_action("Export completed!", "end")
