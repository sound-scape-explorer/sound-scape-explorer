from processing.maps.VolumeByName import VolumeByName


def validate_volume_name(name: str) -> None:
    if name not in VolumeByName.keys():
        raise KeyError(f'Volume: {name} not found!')
