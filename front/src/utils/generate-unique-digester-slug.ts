import {type Digester} from 'src/composables/use-digesters';

export function generateUniqueDigesterSlug(digester: Digester): string {
  return `${digester.index} - ${digester.name}`;
}
