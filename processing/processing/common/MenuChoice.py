from enum import Enum


class MenuChoice(Enum):
    RefreshConfig = "Refresh configuration"
    ExtractAggregate = "Run extractions and aggregations"
    Reduce = "Run reductions"
    ComputeRequirements = (
        "Run computation UMAPs and mean distances matrix"
        " (needed for autocluster and relative trajectories)"
    )
    PurgeRequirements = "Purge computation UMAPs and mean distances matrix"
    Autocluster = "Run autoclusters"
    Trace = "Run trajectories"
    RelativeTrace = "Run relative trajectories"
    Digest = "Run digests"
    RunAll = "Run all"
    ExportDataframe = "Export dataframe as .csv"
    ExportComputationUmaps = "Export computation UMAPs as .npy"
    ExportMeanDistancesMatrix = "Export mean distances matrix as .npy"
    Repack = "Repack storage with `h5repack` (UNIX only)"
    FixAudioWindows10_7_2 = "Fix audio on Windows for versions <=10.7.2"
    Quit = "Quit"
