from processing.storage.Storage import Storage

storage = Storage(path='./sample/sse.h5')

files = storage.get_files()
bands = storage.get_bands()

features_pointers = []
features_loaded = []

for file_index in storage.enumerate_file_indexes():
    features = storage.get_file_features(
        band_name=bands[0],
        file_index=file_index,
    )

    features_pointers.append(features)
    features_loaded.append(features[()])

print(features_pointers)
print(features_loaded)
