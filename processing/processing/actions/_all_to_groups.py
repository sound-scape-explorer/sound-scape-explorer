from processing.actions.run_config import run_config
from processing.actions.run_files import run_files
from processing.actions.run_groups import run_groups
from processing.common.Env import Env

env = Env()

run_config(env)

run_files(env)
run_groups(env)
