import {z} from 'zod';

const prefix = 'sse';

export const LocalStorageKey = z.enum([
  'DRAGGABLES',
  'SETTINGS',
  'SELECTION_BOXES',
]);
// eslint-disable-next-line no-redeclare
export type LocalStorageKey = z.infer<typeof LocalStorageKey>;

export const getLocalStorageKey = (key: LocalStorageKey) => `${prefix}-${key}`;
