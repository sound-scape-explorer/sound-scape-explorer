from datetime import datetime

from processing.utils.digest_config_columns import digest_config_columns
from processing.utils.digest_config_sites import digest_config_sites
from processing.utils.extract_name_from_digest_action import \
    extract_name_from_digest_action
from processing.utils.namedtuple_dic import namedtuple_dic


def digest_xtable_columns(
        xpath,
        xt,
        c_key,
        c_values=None,
        yield_type=None,
        disable_prefix=False,
        allow_duplicate=False
):
    if c_values is None:
        c_values = ''

    simple = False

    if type(c_values) == str:
        c_values = [c_values]
        simple = True

    if not disable_prefix:
        c_values = [c_key + '_' + c for c in c_values]

    types = []

    for c_val in c_values:
        if ':' in c_val:
            t = c_val.split(':')[1]

            name = extract_name_from_digest_action(c_val)

            types.append({
                             'I': int,
                             'D': lambda v: datetime.strptime(v, '%Y%m%d_%H%M'),
                             'L': lambda v: v.split(','),
                             'SITES': digest_config_sites,
                             'L-': lambda v: v.split('-'),
                             'L-D': lambda v: [
                                 datetime.strptime(vv, '%Y%m%d_%H%M') for vv in
                                 v.split('-')],
                             'COLUMN': lambda el: digest_config_columns(
                                 name,
                                 el,
                             )
                         }[t])
        else:
            types.append(str)

    c_values = [c_val.split(':')[0] for c_val in c_values]

    for c in [c_key] + c_values:
        if c not in xt:
            print(xt.columns)
            raise Exception(f'In {xpath}, need a column named "{c}"')

    res = {}  # actually not as we yield
    for i in range(len(xt[c_key])):
        if type(xt[c_key][i]) == str:
            k = xt[c_key][i]
            if k in res and not allow_duplicate:
                raise Exception(
                    f'In {xpath}: column "{c_key}" contains "{k}" twice.')
            if simple:
                v = [types[ic](xt[c][i]) for ic, c in enumerate(c_values)]
                res[k] = v
                yield k, v[0]
            else:
                start = 0 if disable_prefix else len(c_key) + 1
                v = namedtuple_dic({c[start:]: types[ic](xt[c][i]) for ic, c in
                                    enumerate(c_values)}, yield_type)
                res[k] = v
                yield k, v
