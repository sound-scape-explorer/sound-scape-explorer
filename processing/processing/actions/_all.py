from processing.actions.run_autoclusters import run_autoclusters
from processing.actions.run_computation_umaps import run_computation_umaps
from processing.actions.run_config import run_config
from processing.actions.run_groups import run_groups
from processing.actions.run_matrices import run_matrices
from processing.actions.run_mean_distances_matrix import run_mean_distances_matrix
from processing.actions.run_pairings import run_pairings
from processing.actions.run_reducers import run_reducers
from processing.actions.run_trajectories import run_trajectories
from processing.actions.run_volumes import run_volumes
from processing.common.Env import Env

env = Env()

# TODO: Replace this with CLI prompt

run_config(env)

run_groups(env)

run_reducers(env)

run_computation_umaps(env)
run_mean_distances_matrix(env)
run_autoclusters(env)
run_trajectories(env)

run_volumes(env)
run_matrices(env)
run_pairings(env)
