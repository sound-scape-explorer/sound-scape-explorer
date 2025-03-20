from enum import Enum


class TrajectoryStep(Enum):
    hour = 60 * 60
    day = 60 * 60 * 24
    month = 60 * 60 * 24 * 30
