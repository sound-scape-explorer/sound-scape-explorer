import unittest

import numpy

from processing.utils.validate_int import validate_int


class TestValidateInt(unittest.TestCase):

    def test_valid_int(self):
        # Test for valid int input
        self.assertIsNone(validate_int(10))

    def test_numpy_int(self):
        # Test for numpy int input
        self.assertIsNone(validate_int(numpy.int64(10)))

    def test_string_input(self):
        # Test for string input
        with self.assertRaises(TypeError):
            validate_int('10')

    def test_float_input(self):
        # Test for float input
        with self.assertRaises(TypeError):
            validate_int(10.5)

    def test_list_input(self):
        # Test for list input
        with self.assertRaises(TypeError):
            validate_int([10])

    def test_dict_input(self):
        # Test for dict input
        with self.assertRaises(TypeError):
            validate_int({'value': 10})

    def test_none_input(self):
        # Test for None input
        with self.assertRaises(TypeError):
            validate_int(None)
