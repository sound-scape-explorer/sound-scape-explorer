export class AudioQueryError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AudioQueryError';
  }
}

export class AudioBufferError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AudioBufferError';
  }
}
