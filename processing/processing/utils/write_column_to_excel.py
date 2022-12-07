import pandas


def write_column_to_excel(worksheet, values, excel_column):
    df = pandas.DataFrame(
        {excel_column: [f'files_{excel_column}', None, *values]}
    )

    for i, row in df.iterrows():
        cell = f'{excel_column}%d' % (i + 1)
        worksheet[cell] = row[0]
