import {type Intent} from '@blueprintjs/core';

export interface Validation {
  intent: Intent;
  content: string;
}

export function createDefaultValidation() {
  const v: Validation = {
    intent: 'success',
    content: 'OK',
  };

  return v;
}

export function isInt(n: number) {
  return Math.floor(n) === n;
}
