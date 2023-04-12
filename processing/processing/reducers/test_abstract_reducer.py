import unittest
from typing import List
from unittest import mock

from processing.reducers.AbstractReducer import AbstractReducer


class TestAbstractReducer(unittest.TestCase):

    def test_reduce_success(self):
        class TestReducer(AbstractReducer):
            def reduce(self, features: List[List[float]]) -> List[List[float]]:
                return [[sum(f)] for f in features]

            def get_instance(self):
                return TestReducer()

        reducer = TestReducer()
        features = [[1.0, 2.0], [3.0, 4.0]]
        expected_reduced_features = [[3.0], [7.0]]
        reduced_features = reducer.reduce(features)
        self.assertListEqual(reduced_features, expected_reduced_features)

    def test_reduce_failure(self):
        class TestReducer(AbstractReducer):
            def reduce(self, features: List[List[float]]) -> List[List[float]]:
                return [[sum(f)] for f in features]

            def get_instance(self):
                return TestReducer()

        reducer = TestReducer()
        features = None
        with self.assertRaises(TypeError):
            reducer.reduce(features)

    def test_reduce_and_split_success(self):
        class TestReducer(AbstractReducer):
            def reduce(self, features: List[List[float]]) -> List[List[float]]:
                return [[sum(f)] for f in features]

            def get_instance(self):
                return TestReducer()

        reducer = TestReducer()
        features = [[1.0, 2.0], [3.0, 4.0], [5.0, 6.0], [7.0, 8.0], [9.0, 10.0],
                    [11.0, 12.0]]
        expected_split_features = [[[3.0], [7.0]], [[11.0], [15.0]],
                                   [[19.0], [23.0]]]
        split_features = reducer.reduce_and_split(features, 3)
        self.assertListEqual(split_features, expected_split_features)

    def test_reduce_and_split_failure(self):
        class TestReducer(AbstractReducer):
            def reduce(self, features: List[List[float]]) -> List[List[float]]:
                return [[sum(f)] for f in features]

            def get_instance(self):
                return TestReducer()

        reducer = TestReducer()
        features = None
        files_length = 2
        with self.assertRaises(TypeError):
            reducer.reduce_and_split(features, files_length)

    def test_get_instance(self):
        class TestReducer(AbstractReducer):
            def reduce(self, features: List[List[float]]) -> List[List[float]]:
                pass

            def get_instance(self):
                return TestReducer()

        reducer = TestReducer()
        instance = reducer.get_instance()
        self.assertIsInstance(instance, TestReducer)

    def test_reduce_with_mock(self):
        reducer_mock = mock.MagicMock(spec=AbstractReducer)
        reducer_mock.reduce.return_value = [[1.0], [2.0]]
        features = [[1.0, 2.0], [3.0, 4.0]]
        expected_reduced_features = [[1.0], [2.0]]
        reduced_features = reducer_mock.reduce(features)
        self.assertListEqual(reduced_features, expected_reduced_features)


if __name__ == '__main__':
    unittest.main()
