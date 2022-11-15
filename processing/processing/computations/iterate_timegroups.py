import datetime as dt


def iterate_timegroups(r, integration, range_bins, group_starts):
    for g_start_i, g_start in enumerate(group_starts):
        t_start = r[0] + range_bins[g_start] * dt.timedelta(seconds=integration)
        g_end = None if g_start_i == len(group_starts) - 1 else group_starts[
            g_start_i + 1]
        yield g_start, g_end, t_start, g_start_i
