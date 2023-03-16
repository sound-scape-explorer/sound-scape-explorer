from processing.deprecated_classes.Config import Config
from processing.deprecated_classes.Filepaths import Filepaths
from processing.deprecated_utils.close_excel_file import close_excel_file
from processing.deprecated_utils.open_excel_file import open_excel_file
from processing.deprecated_utils.write_column_to_excel import \
    write_column_to_excel


class ConfigGenerator:
    """The configuration generator.

    Use this to populate the Excel configuration file with data retrieved from
    filenames.

    Attributes:
        __path: The relative path to existing Excel configuration file on disk.

    Examples:
        With an example filename of `POST_CerBra_alarm_1_a_SPRING.wav`,
        we can get the following data:

            - The path: `./audio/POST_CerBra_alarm_1_a_SPRING.wav`
                ==> Will write to column `files`
            - The file timestamp: `20210101_0100`
                ==> Will write to column `files_start`
            - The meta data: ['POST', 'CerBra', 'alarm', 1, 'a', 'SPRING']
                ==> Will write to columns `files_META_PROPERTY`
    """

    def __init__(
        self,
        path: str = 'config.xlsx',
    ) -> None:
        self.__path = path

        self.__open()
        self.__get_attributes()
        self.__write_filenames()
        self.__write_dates()
        self.__write_meta_values()
        self.__close()

    def __open(self):
        self.__workbook, self.__worksheet = open_excel_file(self.__path)

    def __close(self):
        close_excel_file(self.__workbook, self.__path)

    def __get_column_letter(self, column_name):
        return self.__columns[column_name]['letter']

    def __get_attributes(self):
        self.__filepaths = Filepaths()
        self.__filenames = self.__filepaths.get_filenames()
        self.__dates = self.__filepaths.get_times_as_dates()

        self.__config = Config()
        self.__columns = self.__config.get_columns()

    def __write_filenames(self):
        write_column_to_excel(
            self.__worksheet,
            self.__filenames,
            self.__get_column_letter('files'),
            'files'
        )

    def __write_dates(self):
        write_column_to_excel(
            self.__worksheet,
            self.__dates,
            self.__get_column_letter('files_start'),
            'files_start'
        )

    def __write_meta_values(self):
        meta_titles = self.__config.get_meta_properties()
        meta_values = self.__filepaths.get_meta_values()

        for meta_title_index, meta_title in enumerate(meta_titles):
            payload = []

            for meta_value in meta_values:
                payload.append(meta_value[meta_title_index])

            title = f'files_{meta_title}'

            write_column_to_excel(
                self.__worksheet,
                payload,
                self.__get_column_letter(title),
                title,
            )