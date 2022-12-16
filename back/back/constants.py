import os

cwd = os.getcwd()
path = os.path.split(cwd)[0]

BASEPATH = f'{path}/sample'

ERROR_NOT_FOUND = 'File not found'

PAYLOAD_ERROR = {'success': False}
