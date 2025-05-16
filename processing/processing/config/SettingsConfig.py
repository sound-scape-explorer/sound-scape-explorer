import os

from processing.dtos import SettingsDto
from processing.enums import ComputationStrategy
from processing.lib.time import convert_date_string_to_timestamp


class SettingsConfig:
    storage_path: str
    audio_path: str
    expected_sample_rate: int
    timeline_origin: int  # unix
    audio_host: str
    timezone: str
    computation_strategy: ComputationStrategy
    computation_dimensions: int
    computation_iterations: int
    display_seed: int
    memory_limit: int | float

    def __init__(self, dto: SettingsDto, config_path):
        self.storage_path = os.path.join(os.path.dirname(config_path), dto.storagePath)
        self.audio_path = dto.audioPath
        self.expected_sample_rate = dto.expectedSampleRate
        self.timeline_origin = convert_date_string_to_timestamp(dto.timelineOrigin)
        self.audio_host = dto.audioHost
        self.timezone = dto.timezone
        self.computation_strategy = dto.computationStrategy
        self.computation_dimensions = dto.computationDimensions
        self.computation_iterations = dto.computationIterations
        self.display_seed = dto.displaySeed
        self.memory_limit = dto.memoryLimit
