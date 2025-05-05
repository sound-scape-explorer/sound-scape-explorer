from InquirerPy.base.control import Choice
from InquirerPy.resolver import prompt
from InquirerPy.separator import Separator

from processing.common.MenuChoice import MenuChoice
from processing.constants import STATE_PRESENT, STATE_UNDEFINED, STATE_MISSING
from processing.context import Context
from processing.repositories.AggregatedRepository import AggregatedRepository
from processing.repositories.AutoclusteredRepository import AutoclusteredRepository
from processing.repositories.ComputedRepository import ComputedRepository
from processing.repositories.ExtractedRepository import ExtractedRepository
from processing.repositories.MetricRepository import MetricRepository
from processing.repositories.ReducedRepository import ReducedRepository
from processing.repositories.RelativeTracedRepository import RelativeTracedRepository
from processing.repositories.TracedRepository import TracedRepository
from processing.printers.print_menu_legend import print_menu_legend


def _wrap(choice: MenuChoice, context: Context):
    presence_map: dict[MenuChoice, bool] = {
        MenuChoice.RUN_EXTRACTIONS: ExtractedRepository.exists(context),
        MenuChoice.RUN_AGGREGATIONS: AggregatedRepository.exists(context),
        MenuChoice.RUN_REDUCTIONS: ReducedRepository.exists(context),
        MenuChoice.RUN_COMPUTATIONS: ComputedRepository.exists(context),
        MenuChoice.RUN_AUTOCLUSTERS: AutoclusteredRepository.exists(context),
        MenuChoice.RUN_METRICS: MetricRepository.exists(context),
        MenuChoice.RUN_TRAJECTORIES: TracedRepository.exists(context),
        MenuChoice.RUN_RELATIVE_TRAJECTORIES: RelativeTracedRepository.exists(context),
    }

    undefined_map: dict[MenuChoice, bool] = {
        MenuChoice.RUN_AUTOCLUSTERS: not context.config.has_autoclusters(),
        MenuChoice.RUN_METRICS: not context.config.has_metrics(),
        MenuChoice.RUN_TRAJECTORIES: not context.config.has_trajectories(),
        MenuChoice.RUN_RELATIVE_TRAJECTORIES: not context.config.has_trajectories(),
    }

    is_present = presence_map.get(choice)
    is_undefined = undefined_map.get(choice)

    if is_present:
        icon = STATE_PRESENT
    elif is_undefined:
        icon = STATE_UNDEFINED
    else:
        icon = STATE_MISSING

    return Choice(value=choice.value, name=f"{icon} {choice.value}")


def prompt_menu(context: Context):
    print_menu_legend()

    questions = [
        {
            "type": "list",
            "name": "choices",
            "choices": [
                MenuChoice.RUN_ALL.value,
                Separator(),
                _wrap(MenuChoice.RUN_EXTRACTIONS, context),
                _wrap(MenuChoice.RUN_AGGREGATIONS, context),
                _wrap(MenuChoice.RUN_REDUCTIONS, context),
                _wrap(MenuChoice.RUN_COMPUTATIONS, context),
                _wrap(MenuChoice.RUN_AUTOCLUSTERS, context),
                _wrap(MenuChoice.RUN_METRICS, context),
                _wrap(MenuChoice.RUN_TRAJECTORIES, context),
                _wrap(MenuChoice.RUN_RELATIVE_TRAJECTORIES, context),
                Separator(),
                MenuChoice.RUN_COMPUTATIONS_PURGE.value,
                MenuChoice.RUN_DATAFRAME_EXPORT.value,
                MenuChoice.RUN_COMPUTATIONS_EXPORT.value,
                MenuChoice.RUN_MDM_EXPORT.value,
                Separator(),
                MenuChoice.QUIT.value,
            ],
            "message": "Choose your action",
            "default": context.last_choice,
        }
    ]

    answers = prompt(questions=questions, vi_mode=True)
    answer: str = str(answers["choices"])
    return answer
