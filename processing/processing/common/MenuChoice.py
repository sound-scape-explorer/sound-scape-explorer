from enum import Enum


class MenuChoice(Enum):
    RunConfigurationRefresh = "Refresh configuration"
    RunExtractionsAggregations = "Run extractions and aggregations"
    RunReductions = "Run reductions"
    RunComputations = (
        "Run computations for mean distances matrix"
        " (needed for autocluster and relative trajectories)"
    )
    RunComputationsPurge = "Purge computation UMAPs and mean distances matrix"
    RunAutoclusters = "Run autoclusters"
    RunTrajectories = "Run trajectories"
    RunRelativeTrajectories = "Run relative trajectories"
    RunDigestions = "Run digestions"
    RunAll = "Run all"
    RunDataframeExport = "Export dataframe as .csv"
    RunComputationsExport = "Export computations as .npy"
    RunMdmExport = "Export mean distances matrix as .npy"
    Repack = "Repack storage with `h5repack` (UNIX only)"
    FixAudioWindows10_7_2 = "Fix audio on Windows for versions <=10.7.2"
    Quit = "Quit"
