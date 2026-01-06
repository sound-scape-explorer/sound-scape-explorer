import os from 'node:os';
import path from 'node:path';

export const SCRATCH_FILENAME = 'sse-scratch';
export const SCRATCH_PATH = path.join(os.tmpdir(), `${SCRATCH_FILENAME}.wav`);
