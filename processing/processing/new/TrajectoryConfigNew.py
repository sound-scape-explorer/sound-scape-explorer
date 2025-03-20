from dataclasses import dataclass

from processing.common.ContinuousTimeTrajectory import ContinuousTimeTrajectory
from processing.dtos import TrajectoryDto
from processing.new.BandConfigNew import BandConfigNew
from processing.new.IntegrationConfigNew import IntegrationConfigNew
from processing.new.ReducerConfigNew import ReducerConfigNew
from processing.new.TrajectoryStep import TrajectoryStep
from processing.new.time import convert_date_string_to_timestamp


@dataclass
class TrajectoryConfigNew:
    index: int
    name: str
    start: int  # unix
    end: int  # unix
    label_property: str
    label_value: str
    step: TrajectoryStep

    band: BandConfigNew = None
    integration: IntegrationConfigNew = None
    reducer: ReducerConfigNew = None
    instance: ContinuousTimeTrajectory = None

    @classmethod
    def from_dto(cls, dto: TrajectoryDto):
        step = TrajectoryStep[dto.step.value]

        return cls(
            index=dto.index,
            name=dto.name,
            start=convert_date_string_to_timestamp(dto.start),
            end=convert_date_string_to_timestamp(dto.end),
            label_property=dto.labelProperty,
            label_value=dto.labelValue,
            step=step,
        )

    def create_instance(
        self,
        band: BandConfigNew,
        integration: IntegrationConfigNew,
        reducer: ReducerConfigNew,
    ) -> ContinuousTimeTrajectory:
        self.band = band
        self.integration = integration
        self.reducer = reducer
        self.instance = ContinuousTimeTrajectory()
        return self.instance
