from enum import Enum
from typing import Union

from processing.common.AggregatedReducible import AggregatedReducible
from processing.config.labels.LabelConfig import LabelConfig
from processing.context import Context
from processing.digesters.Digester import Digester
from processing.new.paths import register_path, build_path


class DigestedPath(Enum):
    data = register_path("digested", "data")


class DigestedManager:
    @staticmethod
    def delete(context: Context):
        context.storage.delete(DigestedPath.data.value)

    @staticmethod
    def exists(context: Context):
        return context.storage.exists(DigestedPath.data.value)

    @staticmethod
    def to_storage(
        context: Context,
        reducible: AggregatedReducible,
        digester: Digester,
        data: list[float],
        label_a: LabelConfig,
        label_b: Union[LabelConfig, None],
    ):
        path_suffix = [
            reducible.band.index,
            reducible.integration.index,
            digester.index,
            label_a.index,
        ]

        path = build_path(DigestedPath.data.value, *path_suffix)

        attributes = {
            "digester_index": digester.index,
            "label_a_property": label_a.property,
            "label_a_index": str(label_a.index),
        }

        if label_b is not None:
            path = build_path(DigestedPath.data.value, *path_suffix, label_b.index)

            attributes = {
                **attributes,
                **{
                    "label_b_property": label_b.property,
                    "label_b_index": str(label_b.index),
                },
            }

        context.storage.write(
            path=path,
            data=data,
            attributes=attributes,
        )
