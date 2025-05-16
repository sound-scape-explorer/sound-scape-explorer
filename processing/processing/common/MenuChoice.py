from enum import Enum


class MenuChoice(Enum):
    RUN_EXTRACTIONS = "Run extractions"
    RUN_AGGREGATIONS = "Run aggregations"
    RUN_REDUCTIONS = "Run reductions"
    RUN_COMPUTATIONS = "Run computations"
    RUN_AUTOCLUSTERS = "Run autoclusters"
    RUN_TRAJECTORIES = "Run trajectories"
    RUN_RELATIVE_TRAJECTORIES = "Run relative trajectories"
    RUN_METRICS = "Run metrics"
    RUN_ALL = "Run all"
    RUN_DATAFRAME_EXPORT = "Export dataframe as .csv"
    RUN_COMPUTATIONS_EXPORT = "Export computations as .npy"
    RUN_MDM_EXPORT = "Export mean distances matrix as .npy"
    QUIT = "Quit"
