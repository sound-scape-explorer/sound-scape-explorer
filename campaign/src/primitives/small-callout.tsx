import {Callout, type Intent} from '@blueprintjs/core';

import styles from './small-callout.module.scss';

interface Props {
  children: string | string[];
  intent?: Intent;
}

export function SmallCallout({children, intent = 'primary'}: Props) {
  return (
    <Callout
      className={styles.callout}
      intent={intent}
    >
      {children}
    </Callout>
  );
}
