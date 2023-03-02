from processing.reducers.PcaReducer import PcaReducer
from processing.reducers.SparsePcaReducer import SparsePcaReducer
from processing.reducers.UmapReducer import UmapReducer
from processing.reducers.VaeReducer import VaeReducer

ReducerByName = {
    'umap': UmapReducer,
    'vae': VaeReducer,
    'pca': PcaReducer,
    'sparse_pca': SparsePcaReducer,
}
