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
from processing.utils.print_menu_legend import print_menu_legend


def _wrap(choice: MenuChoice, context: Context):
    check_map: dict[MenuChoice, Callable[[Context], bool]] = {
        MenuChoice.RefreshConfig: lambda ctx: ConfigManager.exists(ctx),
        MenuChoice.ExtractAggregate: lambda ctx: AggregatedManager.exists(ctx),
        MenuChoice.Reduce: lambda ctx: ReducedManager.exists(ctx),
        MenuChoice.ComputeRequirements: lambda ctx: ComputedManager.exists(ctx),
        MenuChoice.Autocluster: lambda ctx: AutoclusteredManager.exists(ctx),
        MenuChoice.Trace: lambda ctx: TracedManager.exists(ctx),
        MenuChoice.RelativeTrace: lambda ctx: RelativeTracedManager.exists(ctx),
        MenuChoice.Digest: lambda ctx: DigestedManager.exists(ctx),
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
                _wrap(MenuChoice.RefreshConfig, context),
                _wrap(MenuChoice.ExtractAggregate, context),
                _wrap(MenuChoice.Reduce, context),
                Separator(),
                _wrap(MenuChoice.ComputeRequirements, context),
                Separator(),
                _wrap(MenuChoice.Autocluster, context),
                _wrap(MenuChoice.Trace, context),
                _wrap(MenuChoice.RelativeTrace, context),
                _wrap(MenuChoice.Digest, context),
                Separator(),
                MenuChoice.PurgeRequirements.value,
                MenuChoice.ExportDataframe.value,
                MenuChoice.ExportComputed.value,
                MenuChoice.ExportMeanDistancesMatrix.value,
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
