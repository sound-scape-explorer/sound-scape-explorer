from enum import Enum

from InquirerPy import prompt
from InquirerPy.separator import Separator


class MenuChoice(Enum):
    RefreshConfig = "Refresh configuration"
    ExtractAggregate = "Run extractions and aggregations"
    Reduce = "Run reductions"
    ComputeRequirements = (
        "Run computation UMAPs and mean distances matrix (needed for autocluster)"
    )
    PurgeRequirements = "Purge computation UMAPs and mean distances matrix"
    Autocluster = "Run autoclusters"
    Trace = "Run trajectories"
    Digest = "Run digests"
    RunAll = "Run all"
    ExportDataframe = "Export dataframe as .csv"
    ExportComputationUmaps = "Export computation UMAPs as .npy"
    ExportMeanDistancesMatrix = "Export mean distances matrix as .npy"
    Repack = "Repack storage with `h5repack` (UNIX only)"
    FixAudioWindows10_7_2 = "Fix audio on Windows for versions <=10.7.2"
    Quit = "Quit"


def ask_menu() -> str:
    questions = [
        {
            "type": "list",
            "name": "choices",
            "choices": [
                MenuChoice.RefreshConfig.value,
                MenuChoice.ExtractAggregate.value,
                MenuChoice.Reduce.value,
                Separator(),
                MenuChoice.ComputeRequirements.value,
                MenuChoice.PurgeRequirements.value,
                Separator(),
                MenuChoice.Autocluster.value,
                MenuChoice.Trace.value,
                MenuChoice.Digest.value,
                Separator(),
                MenuChoice.RunAll.value,
                MenuChoice.ExportDataframe.value,
                MenuChoice.ExportComputationUmaps.value,
                MenuChoice.ExportMeanDistancesMatrix.value,
                MenuChoice.Repack.value,
                Separator(),
                MenuChoice.FixAudioWindows10_7_2.value,
                Separator(),
                MenuChoice.Quit.value,
            ],
            "message": "Choose your action",
        }
    ]

    answers = prompt(questions)
    answer: str = str(answers["choices"])
    return answer
