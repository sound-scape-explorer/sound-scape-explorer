from enum import Enum

from PyInquirer import Separator, prompt
from rich import print


class MenuChoice(Enum):
    RunAll = "Run all"
    RefreshConfig = "Refresh configuration"
    ExtractAggregate = "Run extractions and aggregations"
    Reduce = "Run reductions"
    ComputeRequirements = (
        "Run computation UMAPs and mean distances matrix"
        " (needed for autoclusters and trajectories)"
    )
    PurgeRequirements = "Purge computation UMAPs and mean distances matrix"
    Autocluster = "Run autoclusters"
    Trace = "Run trajectories"
    Digest = "Run digests (volumes, matrices, pairings)"
    Repack = "Repack storage with `h5repack` (UNIX only)"
    Quit = "Quit"


def ask_menu() -> str:
    questions = [
        {
            "type": "list",
            "name": "choices",
            # "choices": [choice.value for choice in MenuChoice],
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
                MenuChoice.Repack.value,
                Separator(),
                MenuChoice.Quit.value,
            ],
            "message": "Choose your action",
        }
    ]

    print()
    answers = prompt(questions)
    answer: str = answers["choices"]
    return answer
