from processing.config.Config import Config

config = Config(path='./sample/config.xlsx')

files = config.get_files()

print(files)
