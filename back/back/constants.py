import os
from typing import Dict

cwd: str = os.getcwd()
path: str = os.path.split(cwd)[0]

BASE_PATH: str = f'{path}/sample'

ERROR_NOT_FOUND: str = 'File not found'

PAYLOAD_ERROR: Dict[str, bool] = {'success': False}
