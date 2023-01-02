import {configStore} from '../store/config.store';
import {convertTagsToFilterString} from './convert-tags-to-filter-string';

export function findTags(timestamp: number, site: string): string {
  const {config} = configStore;
  let payload = '';

  if (!config) {
    return payload;
  }

  const files = config.files;

  Object.keys(files).forEach((logger) => {
    const loggerOptions = files[logger];
    const loggerTime = new Date(loggerOptions[1]).getTime();
    const loggerSite = loggerOptions[0];

    if (!site.includes(loggerSite)) {
      return payload;
    }

    if (loggerTime !== timestamp * 1000) {
      return payload;
    }

    const loggerTags = loggerOptions[2];

    if (typeof loggerTags === 'string' && loggerTags === '') {
      return payload;
    }

    payload = convertTagsToFilterString(loggerTags);
  });

  return payload;
}
