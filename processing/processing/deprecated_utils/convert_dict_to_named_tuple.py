import collections


def convert_dict_to_named_tuple(d, typename='new'):
    top = collections.namedtuple(
        typename,
        [i for i, j in d.items() if not i.startswith('_')],
    )(
        *[j for i, j in d.items() if not i.startswith('_')]
    )

    return top
