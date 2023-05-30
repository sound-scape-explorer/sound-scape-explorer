from processing.actions.run_autocluster import run_autocluster
from processing.actions.run_config import run_config
from processing.actions.run_files import run_files
from processing.actions.run_groups import run_groups
from processing.actions.run_indicators import run_indicators
from processing.actions.run_matrices import run_matrices
from processing.actions.run_pairings import run_pairings
from processing.actions.run_reducers import run_reducers
from processing.actions.run_volumes import run_volumes
from processing.common.Env import Env

env = Env()

run_config(env)
run_files(env)
run_groups(env)
run_autocluster(env)
run_reducers(env)
run_indicators(env)
run_volumes(env)
run_matrices(env)
run_pairings(env)
