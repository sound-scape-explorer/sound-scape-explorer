import {TAG_PREFIX_FOR_TABLE} from 'src/constants';

export function addPrefixToTagName(property: string) {
  return `${TAG_PREFIX_FOR_TABLE}${property.toUpperCase()}`;
}

export function removePrefixFromTagName(property: string) {
  return property.replace(TAG_PREFIX_FOR_TABLE, '');
}
