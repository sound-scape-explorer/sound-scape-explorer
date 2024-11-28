import {type CSSProperties} from 'react';

export interface CustomCountStyleProps extends CSSProperties {
  '--count': number;
  '--align': 'center' | 'flex-start';
}
