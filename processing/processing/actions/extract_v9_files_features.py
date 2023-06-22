import argparse

from pandas import DataFrame

from processing.common.Timer import Timer
from processing.storage.Storage import Storage
from processing.utils.print_new_line import print_new_line


def extract_v9_files_features(
    storage: Storage,
    band: str,
    output: str,
) -> None:
    path = f"/files_features/{band}"
    features_dataset = storage.read(path)

    length = features_dataset.len()
    batch = 100000
    steps = int(length / batch)

    print_new_line()
    print(f"Files count: {length}")
    timer = Timer(steps)

    i = 0
    while True:
        if i > length:
            start = i - batch
            features = features_dataset[start:]
            df = DataFrame(features)
            df.to_csv(path_or_buf=output, mode="a", header=False)
            timer.progress()
            print_new_line()
            print("end")
            break

        start = i
        end = start + batch
        features = features_dataset[start:end]
        df = DataFrame(features)
        df.to_csv(path_or_buf=output, mode="a", header=False)
        i += batch
        timer.progress()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()

    parser.add_argument("-b", "--band")
    parser.add_argument("-o", "--output")
    parser.add_argument("-s", "--storage")

    args = parser.parse_args()

    storage = Storage(path=str(args.storage))
    band = str(args.band)
    output = str(args.output)

    extract_v9_files_features(storage=storage, band=band, output=output)
