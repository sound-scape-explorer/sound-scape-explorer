from typing import Optional

from InquirerPy.resolver import prompt
from InquirerPy.separator import Separator

from processing.common.MenuChoice import MenuChoice
from processing.storage.Storage import Storage
from processing.utils.print_menu_legend import print_menu_legend
from processing.utils.wrap_menu_choice_with_state import wrap_menu_choice_with_state


def ask_menu(
    storage: Storage,
    last_choice: Optional[str] = None,
) -> str:
    print_menu_legend()

    questions = [
        {
            "type": "list",
            "name": "choices",
            "choices": [
                wrap_menu_choice_with_state(MenuChoice.RefreshConfig, storage),
                wrap_menu_choice_with_state(MenuChoice.ExtractAggregate, storage),
                wrap_menu_choice_with_state(MenuChoice.Reduce, storage),
                Separator(),
                wrap_menu_choice_with_state(MenuChoice.ComputeRequirements, storage),
                MenuChoice.PurgeRequirements.value,
                Separator(),
                wrap_menu_choice_with_state(MenuChoice.Autocluster, storage),
                wrap_menu_choice_with_state(MenuChoice.Trace, storage),
                wrap_menu_choice_with_state(MenuChoice.RelativeTrace, storage),
                wrap_menu_choice_with_state(MenuChoice.Digest, storage),
                Separator(),
                MenuChoice.RunAll.value,
                Separator(),
                MenuChoice.ExportDataframe.value,
                MenuChoice.ExportComputationUmaps.value,
                MenuChoice.ExportMeanDistancesMatrix.value,
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
