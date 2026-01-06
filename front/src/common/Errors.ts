import {useAppNotification} from 'src/app/notification/use-app-notification';
import {capitalizeFirstLetter} from 'src/utils/strings';

const {notify} = useAppNotification();

export function handleGlobalErrors(err: unknown) {
  const error = err instanceof Error ? err : new Error(String(err));
  notify('error', error.name, error.message);
  console.error(error);
}

class BaseError extends Error {
  constructor(message: string) {
    super(capitalizeFirstLetter(message));
    this.name = this.constructor.name;
  }
}

export class AppDraggableError extends BaseError {}

export class CsvError extends BaseError {}

export class StorageFileError extends BaseError {}

export class StorageReaderError extends BaseError {}

export class AudioQueryError extends BaseError {}

export class AudioBufferError extends BaseError {}

export class AudioFileError extends BaseError {}

export class AudioContextError extends BaseError {}

export class DraggableHeatmapsError extends BaseError {}

export class ScatterHoversError extends BaseError {}

export class ScatterFeaturesError extends BaseError {}
