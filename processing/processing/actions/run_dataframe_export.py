from pandas import DataFrame

from processing.askers.ask_band import ask_band
from processing.askers.ask_extractor import ask_extractor
from processing.askers.ask_integration import ask_integration
from processing.askers.ask_path_csv import ask_path_csv
from processing.constants import LABEL_PREFIX
from processing.context import Context
from processing.new.AggregatedManager import AggregatedManager
from processing.new.LabelFusionAdapter import LabelFusionAdapter
from processing.new.ReducedManager import ReducedManager
from processing.new.ReducerConfigNew import ReducerConfigNew
from processing.new.iterate_reducers import iterate_reducers
from processing.printers.print_action import print_action
from processing.utils.convert_timestamp_to_date import convert_timestamp_to_date
from processing.validators.validate_configuration import validate_configuration


@validate_configuration
def run_dataframe_export(context: Context):
    print_action("Export started", "start")

    raw: dict[str, list[str]] = {}

    band = ask_band(context)
    integration = ask_integration(context)
    extractor = ask_extractor(context)
    csv_path = ask_path_csv(context)

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
    fused_labels = LabelFusionAdapter.from_storage(
        context,
        band,
        integration,
        extractor,
    )

    for fl in fused_labels:
        key = f"{LABEL_PREFIX}{fl.property}"
        raw[key] = fl.values

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
    for index in range(aggregated.data.shape[1]):
        elements = [str(extractor.index), extractor.name, f"{index}"]
        key = "_".join(elements)
        raw[key] = [d[index] for d in aggregated.data]

    df = DataFrame(raw)
    df.to_csv(csv_path, index=False)

    print_action("Export completed!", "end")
