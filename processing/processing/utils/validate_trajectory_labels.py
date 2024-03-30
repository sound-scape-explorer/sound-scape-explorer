from typing import List

from processing.common.TrajectoryConfigError import TrajectoryConfigError
from processing.config.labels.LabelConfig import LabelConfig


def validate_trajectory_labels(
    names: List[str],
    properties: List[str],
    values: List[str],
    labels: List[LabelConfig],
) -> None:
    files_properties, files_values = LabelConfig.flatten(labels)

    for i, property_ in enumerate(properties):
        if property_ not in files_properties:
            raise TrajectoryConfigError(
                f"Property {property_} not found in files for trajectory {names[i]}."
            )

        property_index = files_properties.index(property_)
        value = values[i]
        files_value = files_values[property_index]

        if value not in files_value:
            raise TrajectoryConfigError(
                f"Value {value} not found in files for property"
                f" {property_} for trajectory {names[i]}."
            )
