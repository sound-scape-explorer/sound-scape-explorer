export const TABLE_COLUMNS = {
  INDEX: 'INDEX',
  PATH: 'PATH',
  DATE: 'DATE',
  SITE: 'SITE',
};

export type TableColumnType =
  (typeof TABLE_COLUMNS)[keyof typeof TABLE_COLUMNS];
