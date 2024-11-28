import {LABEL_PREFIX} from 'src/constants.ts';

export function addPrefixToLabelProperty(property: string) {
  return `${LABEL_PREFIX}${property.toUpperCase()}`;
}

export function removePrefixFromLabelProperty(property: string) {
  return property.replace(LABEL_PREFIX, '');
}
