import {TAG_PREFIX_FOR_TABLE} from 'src/constants';

export function addPrefixToTagName(tagName: string) {
  return `${TAG_PREFIX_FOR_TABLE}${tagName.toUpperCase()}`;
}

export function removePrefixFromTagName(tagName: string) {
  return tagName.replace(TAG_PREFIX_FOR_TABLE, '');
}

export function removePrefixFromTagKey(tagKey: string) {
  const nameWithPrefix = tagKey.replace('col_', '');
  return removePrefixFromTagName(nameWithPrefix);
}
