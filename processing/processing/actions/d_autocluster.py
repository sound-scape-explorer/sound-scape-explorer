import numpy

from processing.clusterings.AutoConsensusClustering import \
    AutoConsensusClustering
from processing.common.Env import Env
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line

env = Env()
storage = Storage(path=env.storage)

bands = storage.get_bands()
integrations = storage.get_integrations_seconds()

print_new_line()
print('AutoCluster loading')

storage.delete_autocluster()

for band in bands:
    for integration in integrations:
        grouped_features = storage.read_grouped_features_all_files(
            band=band,
            integration=integration,
            unwrap=True,
        )

        clustering = AutoConsensusClustering(
            features=grouped_features,
            iterations=100,
            min_cluster_size=20,
            max_cluster_size=60,
            threshold=0.9,
        )

        consensus = clustering.get_consensus()
        score = clustering.get_score()
        numpy.set_printoptions(threshold=numpy.inf)

        print('Consensus:')

        for value in list(set(consensus)):
            print(f'  {value}: {consensus.count(value)}')

        print(f'Score: {score}')

        storage.write_autocluster(
            autocluster=consensus,
            band=band,
            integration=integration,
        )
