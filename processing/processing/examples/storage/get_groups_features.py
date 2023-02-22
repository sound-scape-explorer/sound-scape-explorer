from processing.storage.Storage import Storage

# `groups` mean after time integration (and obviously filtering)

storage = Storage(path='./sample/sse.h5')

files = storage.get_files()
bands = storage.get_bands()
integrations = storage.get_integrations()

groups_features_pointers = []
groups_features_values = []

for file_index, _ in enumerate(files):
    features = storage.get_group_features(
        band=bands[0],
        integration=integrations[0],
        file_index=file_index,
    )

    groups_features_pointers.append(features)
    groups_features_values.append(features[()])

print(groups_features_pointers)
print(groups_features_values)
