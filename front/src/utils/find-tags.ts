import {configStore} from '../store/config.store';

export function findTags(timestamp: number, site: string): string {
  return configStore
    ?.config
    ?.files
    ?.[site]
    ?.[2]
    ?.join(' @')
    || '';
}
