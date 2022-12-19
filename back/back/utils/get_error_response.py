from back.constants import ERROR_NOT_FOUND


def get_error_response():
    return {'error': ERROR_NOT_FOUND}, 404
