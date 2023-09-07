import numpy as np
from numpy import floating
from numpy.typing import NDArray


def fill_symetrical_matrix_with_nans(matrix: NDArray[floating]) -> NDArray[floating]:
    np.fill_diagonal(matrix, np.nan)
    matrix[np.triu_indices(matrix.shape[0])] = np.nan
    return matrix
