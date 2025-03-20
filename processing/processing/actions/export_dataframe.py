from pandas import DataFrame

from processing.common.AggregatedLabelStorage import AggregatedLabelStorage
from processing.common.AggregatedReducible import AggregatedReducible
from processing.config.files.FileSheet import FileSheet
from processing.context import Context
from processing.new.AggregatedManager import AggregatedManager
from processing.new.ReducedManager import ReducedManager
from processing.utils.ask_band import ask_band
from processing.utils.ask_csv_path import ask_csv_path
from processing.utils.ask_integration import ask_integration
from processing.utils.convert_timestamp_to_date import convert_timestamp_to_date
from processing.utils.print_action import print_action
from processing.utils.validate_configuration import validate_configuration


@validate_configuration
def export_dataframe(context: Context):
    print_action("Export started", "start")

    raw: dict[str, list[str]] = {}

    bands = context.config.bands
    integrations = context.config.integrations
    extractors = context.config.extractors
    first_extractor = extractors[0]

    band = ask_band(context)
    integration = ask_integration(context)
    csv_path = ask_csv_path(context)

    datasets = AggregatedManager.from_storage(
        context,
        band,
        integration,
        first_extractor,
    )

    # indices
    raw["indices"] = []
    for i, _ in enumerate(datasets["timestamps"]):
        raw["indices"].append(str(i))

    # sites
    raw["sites"] = [s[0] for s in datasets["sites"]]

    # timestamps
    raw["timestamps"] = [
        convert_timestamp_to_date(t[0]) for t in datasets["timestamps"]
    ]

    # labels
    reducible = AggregatedReducible(band, integration, first_extractor)
    labels = AggregatedLabelStorage.read_from_storage(context, reducible)

    for al in labels:
        key = f"{FileSheet.label_prefix.value}{al.property}"
        raw[key] = al.values

    # reduced features
    reducers = context.config.reducers

    reducibles = AggregatedReducible.reconstruct(
        bands=bands,
        integrations=integrations,
        extractors=extractors,
    )

    filtered_reducibles = list(
        filter(
            lambda ar_: ar_.band == band and ar_.integration == integration,
            reducibles,
        )
    )

    for reducer in reducers:
        for reducible in filtered_reducibles:
            features = ReducedManager.from_storage(context, reducible, reducer)

            for d in range(reducer.dimensions):
                elements = [
                    str(reducer.index),
                    reducer.impl.name,
                    f"{reducer.dimensions}d",
                    f"{d+1}",
                ]
                key = "_".join(elements)
                raw[key] = [f[d] for f in features]

    # aggregated data
    for extractor in extractors:
        data = AggregatedManager.from_storage(context, band, integration, extractor)

        for index in range(data["data"].shape[1]):
            elements = [str(extractor.index), extractor.name, f"{index+1}"]
            key = "_".join(elements)
            raw[key] = [d[index] for d in data["data"]]

    df = DataFrame(raw)
    df.to_csv(csv_path, index=False)

    print_action("Export completed!", "end")
