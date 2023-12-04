from enum import Enum
from typing import Optional

from InquirerPy.resolver import prompt
from InquirerPy.separator import Separator


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
    DetectFiles = "Detect files and add to configuration"
    ExportDataframe = "Export dataframe as .csv"
    ExportComputationUmaps = "Export computation UMAPs as .npy"
    ExportMeanDistancesMatrix = "Export mean distances matrix as .npy"
    Repack = "Repack storage with `h5repack` (UNIX only)"
    FixAudioWindows10_7_2 = "Fix audio on Windows for versions <=10.7.2"
    Quit = "Quit"


def ask_menu(
    last_choice: Optional[str] = None,
) -> str:
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
                MenuChoice.RelativeTrace.value,
                MenuChoice.Digest.value,
                Separator(),
                MenuChoice.RunAll.value,
                Separator(),
                MenuChoice.DetectFiles.value,
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
            "default": last_choice,
        }
    ]

    answers = prompt(questions=questions, vi_mode=True)
    answer: str = str(answers["choices"])
    return answer
