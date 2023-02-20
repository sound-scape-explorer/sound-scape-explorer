#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Feb  7 10:00:17 2023

@author: rj102145
"""

WORKING_FOLDER = '/home/rj102145/Documents/ujm(Mac-Linux)/travail/sound-scape-explorer/sample'
CONFIG_FILE = WORKING_FOLDER + '/config_init.xlsx'
AUDIO_FOLDER = WORKING_FOLDER + '/audio'
FEATURES_FOLDER = WORKING_FOLDER + '/features'
GENERATED_FOLDER = WORKING_FOLDER + '/generated'

from ConfToFeatures import ConfToFeatures
import FeaturesDataFrame as FeatD 

# import for function


#%%
conf = ConfToFeatures(CONFIG_FILE, WORKING_FOLDER)
conf.filtering(bands = 'poissons', integration = 15, ANNEE = '2022')
# rawFeatures = conf.computeFeatures(save = True)
rawFeatures = conf.loadFeatures()

Features = FeatD.deleteUnusedDim(rawFeatures, dimShortName = 'F_')
Features = FeatD.transformDim(Features, method = 'center-reduce', dimShortName = 'F_',)
Features, reducer = FeatD.dimReduce(Features,
                            dimShortName = 'F_',
                            reducName = 'UMAP2d_D',
                            method = 'umap',
                            n_components = 2,
                            random_state = 42000)
FeatD.plotEmbendded(Features, dim = 'UMAP2d_D', n_components = 2, hue = 'LIEU')



# 1bis faire un clustering par mixage de cluster
Features = FeatD.mixClusterFrom(Features, clustersToMix = ['LIEU', 'REPLICA'])
# 1 table de contingence pour le facteur choisi
dfMetricsOnClust = FeatD.clusterBasicMetrics(Features, hue = 'LIEU/REPLICA')
print(dfMetricsOnClust)
FeatD.plotEmbendded(Features, dim = 'UMAP2d_D', n_components = 2, hue = 'LIEU/REPLICA')
# metrics de volume, recouvrement, etc.
dfCenter, _ = FeatD.centralTend(Features, hue = 'LIEU/REPLICA', centralType = 'medioid', dimShortName = 'F_')
dfVolume, _ = FeatD.volume(Features, hue = 'LIEU/REPLICA', volumeType = 'mean_spreading', dimShortName = 'F_')
dfDist, _ = FeatD.distances(Features, hue = 'LIEU/REPLICA', metric='manhattan', centralType = 'centroid', dimShortName = 'F_')
dfOvl, _ = FeatD.overlaps(Features, hue = 'LIEU/REPLICA', method = 'percentile', dimShortName = 'F_')
FeatD.plotClusterMetMat(dfVolume, dfDist, dfOvl)
# 2 sortir les indices acoustiques
Features = FeatD.acousIndex(Features)

Features = FeatD.deleteUnusedDim(Features, dimShortName = 'AC_')
Features = FeatD.transformDim(Features, method = 'center-reduce', dimShortName = 'AC_',)
Features, reducer = FeatD.dimReduce(Features,
                            dimShortName = 'AC_',
                            reducName = 'UMAP2donAC_D',
                            method = 'umap',
                            n_components = 2,
                            random_state = 42000)
FeatD.plotEmbendded(Features, dim = 'UMAP2donAC_D', n_components = 2, hue = 'LIEU')
# 3 faire un clustering automatique sur un nobre fini de dimension (avec bouclage sur les algos aléatoire type UMAP = agglomeration de clusterings)
Features = FeatD.HDBScan(Features, dimShortName =  'UMAP2d_D', clusterName='hdBScanCluster', min_cluster_size = 50)
FeatD.plotScatter(Features, dim = 'UMAP2d_D', n_components = 2, hue = 'hdBScanCluster')
# 4 faire une recherche de correspondance de clustering
Featuresfilt = FeatD.filtering(Features, hdBScanCluster = ['7', '6', '2', '3', '1', '0', '4', '5'])
FeatD.clusteringCorr(Featuresfilt, factors=['GEOMORPH', 'REPLICA','SUBSTRAT','ABONDANCE', 'hdBScanCluster'], plot=True)
a=FeatD.clusteringPairing(Features, factor1='LIEU', factor2='hdBScanCluster', plot=True)
# 5 faire un filtrage sur les variables chiffrées et les dates


