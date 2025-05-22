from InquirerPy.base.control import Choice
from InquirerPy.resolver import prompt
from InquirerPy.separator import Separator

from processing.common.MenuChoice import MenuChoice
from processing.constants import STATE_PRESENT, STATE_UNDEFINED, STATE_MISSING
from processing.context import Context
from processing.lib.console import Console
from processing.repositories.AggregationRepository import AggregationRepository
from processing.repositories.AutoclusterRepository import AutoclusterRepository
from processing.repositories.ComputationRepository import ComputationRepository
from processing.repositories.ExtractionRepository import ExtractionRepository
from processing.repositories.MetricRepository import MetricRepository
from processing.repositories.ReductionRepository import ReductionRepository
from processing.repositories.RelativeTrajectoryRepository import (
    RelativeTrajectoryRepository,
)
from processing.repositories.TrajectoryRepository import TrajectoryRepository


def _wrap(choice: MenuChoice, context: Context):
    presence_map: dict[MenuChoice, bool] = {
        MenuChoice.RUN_EXTRACTIONS: ExtractionRepository.exists(context),
        MenuChoice.RUN_AGGREGATIONS: AggregationRepository.exists(context),
        MenuChoice.RUN_REDUCTIONS: ReductionRepository.exists(context),
        MenuChoice.RUN_COMPUTATIONS: ComputationRepository.exists(context),
        MenuChoice.RUN_AUTOCLUSTERS: AutoclusterRepository.exists(context),
        MenuChoice.RUN_METRICS: MetricRepository.exists(context),
        MenuChoice.RUN_TRAJECTORIES: TrajectoryRepository.exists(context),
        MenuChoice.RUN_RELATIVE_TRAJECTORIES: RelativeTrajectoryRepository.exists(
            context
        ),
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
    Console.print_menu_legend()

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
