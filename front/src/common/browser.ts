import {z} from 'zod';

const prefix = 'sse';

const LocalStorageKey = z.enum(['DRAGGABLES', 'SETTINGS']);
// eslint-disable-next-line no-redeclare
type LocalStorageKey = z.infer<typeof LocalStorageKey>;
export const getStorageKey = (key: LocalStorageKey) => `${prefix}-${key}`;
