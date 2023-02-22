from processing.storage.Storage import Storage

# https://docs.h5py.org/en/stable/high/dataset.html#reading-writing-data

# Get `/files` in storage
storage = Storage(path='./sample/sse.h5')

files = storage.get_files()

data_pointer = files
print(data_pointer)

data_memory_loaded = files[()]
print(data_memory_loaded)

data_memory_loaded_slice = files[:]  # same as above
print(data_memory_loaded_slice)
