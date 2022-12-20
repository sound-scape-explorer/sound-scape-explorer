from typing import Dict, Tuple

from back.constants import ERROR_NOT_FOUND


def get_error_response() -> Tuple[Dict[str, str], int]:
    return {'error': ERROR_NOT_FOUND}, 404
