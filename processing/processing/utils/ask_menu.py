from enum import Enum

from PyInquirer import Separator, prompt


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
    Digest = "Run digests (volumes, matrices, pairings)"
    RunAll = "Run all"
    ExportDataframe = "Export dataframe as .csv"
    Repack = "Repack storage with `h5repack` (UNIX only)"
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
                MenuChoice.Repack.value,
                Separator(),
                MenuChoice.Quit.value,
            ],
            "message": "Choose your action",
        }
    ]

    answers = prompt(questions)
    answer: str = answers["choices"]
    return answer
