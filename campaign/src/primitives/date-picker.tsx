import {type Intent} from '@blueprintjs/core';
import {DateInput3} from '@blueprintjs/datetime2';
import clsx from 'clsx';
import enUS from 'date-fns/locale/en-US';
import {useMemo} from 'react';
import {DATE_FORMAT, TIMELINE_ORIGIN_MIN} from 'src/constants.ts';

import styles from './date-picker.module.scss';

interface Props {
  value: string;
  onChange: (value: string | null) => void;
  intent?: Intent;
  small?: boolean;
}

export function DatePicker({
  value,
  onChange,
  intent = 'none',
  small = false,
}: Props) {
  const className = useMemo(() => {
    if (intent === 'danger') {
      return 'bp5-intent-danger';
    }

    if (intent === 'success') {
      return 'bp5-intent-success';
    }
  }, [intent]);

  return (
    <DateInput3
      className={clsx(className, small && styles.small)}
      minDate={TIMELINE_ORIGIN_MIN}
      onChange={onChange}
      locale={enUS}
      value={value}
      dateFnsFormat={DATE_FORMAT}
      timePrecision="second"
      showTimezoneSelect={false} // TODO: Add later
    />
  );
}
