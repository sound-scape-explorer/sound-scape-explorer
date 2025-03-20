from enum import Enum

from processing.context import Context
from processing.new.paths import register_path


class TrajectoryPath(Enum):
    indices = register_path("trajectories", "indices")
    names = register_path("trajectories", "names")
    starts = register_path("trajectories", "starts")
    ends = register_path("trajectories", "ends")
    label_properties = register_path("trajectories", "label_properties")
    label_values = register_path("trajectories", "label_values")
    steps = register_path("trajectories", "steps")


class TrajectoryManager:
    @staticmethod
    def _delete(context: Context):
        context.storage.delete(TrajectoryPath.indices.value)
        context.storage.delete(TrajectoryPath.names.value)
        context.storage.delete(TrajectoryPath.starts.value)
        context.storage.delete(TrajectoryPath.ends.value)
        context.storage.delete(TrajectoryPath.label_properties.value)
        context.storage.delete(TrajectoryPath.label_values.value)
        context.storage.delete(TrajectoryPath.steps.value)

    @staticmethod
    def exists(context: Context):
        return (
            context.storage.exists(TrajectoryPath.indices.value)
            and context.storage.exists(TrajectoryPath.names.value)
            and context.storage.exists(TrajectoryPath.starts.value)
            and context.storage.exists(TrajectoryPath.ends.value)
            and context.storage.exists(TrajectoryPath.label_properties.value)
            and context.storage.exists(TrajectoryPath.label_values.value)
            and context.storage.exists(TrajectoryPath.steps.value)
        )

    @staticmethod
    def to_storage(context: Context):
        TrajectoryManager._delete(context)

        trajectories = context.config.trajectories
        storage = context.storage

        indices = [t.index for t in trajectories]
        names = [t.name for t in trajectories]
        starts = [t.start for t in trajectories]
        ends = [t.end for t in trajectories]
        label_properties = [t.label_property for t in trajectories]
        label_values = [t.label_value for t in trajectories]
        steps = [t.step.name for t in trajectories]

        storage.write(path=TrajectoryPath.indices.value, data=indices)
        storage.write(path=TrajectoryPath.names.value, data=names)
        storage.write(path=TrajectoryPath.starts.value, data=starts)
        storage.write(path=TrajectoryPath.ends.value, data=ends)
        storage.write(path=TrajectoryPath.label_properties.value, data=label_properties)
        storage.write(path=TrajectoryPath.label_values.value, data=label_values)
        storage.write(path=TrajectoryPath.steps.value, data=steps)
