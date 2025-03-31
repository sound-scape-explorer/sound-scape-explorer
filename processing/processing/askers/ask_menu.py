from typing import Callable

from InquirerPy.base.control import Choice
from InquirerPy.resolver import prompt
from InquirerPy.separator import Separator

from processing.common.MenuChoice import MenuChoice
from processing.context import Context
from processing.new.AggregatedManager import AggregatedManager
from processing.new.AutoclusteredManager import AutoclusteredManager
from processing.new.ComputedManager import ComputedManager
from processing.new.ConfigManager import ConfigManager
from processing.new.DigestedManager import DigestedManager
from processing.new.ReducedManager import ReducedManager
from processing.new.RelativeTracedManager import RelativeTracedManager
from processing.new.TracedManager import TracedManager
from processing.printers.print_menu_legend import print_menu_legend


def _wrap(choice: MenuChoice, context: Context):
    check_map: dict[MenuChoice, Callable[[Context], bool]] = {
        MenuChoice.RunConfigurationRefresh: lambda ctx: ConfigManager.exists(ctx),
        MenuChoice.RunExtractionsAggregations: lambda ctx: AggregatedManager.exists(
            ctx
        ),
        MenuChoice.RunReductions: lambda ctx: ReducedManager.exists(ctx),
        MenuChoice.RunComputations: lambda ctx: ComputedManager.exists(ctx),
        MenuChoice.RunAutoclusters: lambda ctx: AutoclusteredManager.exists(ctx),
        MenuChoice.RunTrajectories: lambda ctx: TracedManager.exists(ctx),
        MenuChoice.RunRelativeTrajectories: lambda ctx: RelativeTracedManager.exists(
            ctx
        ),
        MenuChoice.RunDigestions: lambda ctx: DigestedManager.exists(ctx),
    }

    check = check_map.get(choice, lambda _: False)
    exists = check(context)
    icon = "✅" if exists else "❌"
    return Choice(value=choice.value, name=f"{icon} {choice.value}")


def ask_menu(context: Context) -> MenuChoice:
    print_menu_legend()

    questions = [
        {
            "type": "list",
            "name": "choices",
            "choices": [
                MenuChoice.RunAll.value,
                Separator(),
                _wrap(MenuChoice.RunConfigurationRefresh, context),
                _wrap(MenuChoice.RunExtractionsAggregations, context),
                _wrap(MenuChoice.RunReductions, context),
                Separator(),
                _wrap(MenuChoice.RunComputations, context),
                Separator(),
                _wrap(MenuChoice.RunAutoclusters, context),
                _wrap(MenuChoice.RunTrajectories, context),
                _wrap(MenuChoice.RunRelativeTrajectories, context),
                _wrap(MenuChoice.RunDigestions, context),
                Separator(),
                MenuChoice.RunComputationsPurge.value,
                MenuChoice.RunDataframeExport.value,
                MenuChoice.RunComputationsExport.value,
                MenuChoice.RunMdmExport.value,
                Separator(),
                MenuChoice.Quit.value,
            ],
            "message": "Choose your action",
            "default": context.last_choice,
        }
    ]

    answers = prompt(questions=questions, vi_mode=True)
    answer: MenuChoice = str(answers["choices"])  # type: ignore
    return answer
