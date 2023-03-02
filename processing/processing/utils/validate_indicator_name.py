from processing.maps.IndicatorByName import IndicatorByName


def validate_indicator_name(name: str) -> None:
    if name not in IndicatorByName.keys():
        raise KeyError(f'Indicator: {name} not found!')
