import json
from pathlib import Path

from processing.config.settings.SettingsConfig import SettingsConfig


class JsonConfig:
    def __init__(
        self,
        path: str,
    ):
        self.path = path

        with Path(self.path).open() as file:
            data = json.load(file)

            self.settings = SettingsConfig(
                storage_path=data["settings"]["storagePath"],
                audio_path=data["settings"]["audioPath"],
                audio_host=data["settings"]["audioHost"],
                expected_sample_rate=data["settings"]["expectedSampleRate"],
                timeline_origin=data["settings"]["timelineOrigin"],
                timezone=data["settings"]["timezone"],
                computation_umap_dimensions=data["settings"]["computationDimensions"],
                computation_umap_iterations=data["settings"]["computationIterations"],
                display_umap_seed=data["settings"]["displaySeed"],
            )

            print(self.settings)
