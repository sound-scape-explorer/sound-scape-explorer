import {Classes, type Intent} from '@blueprintjs/core';
import {DateInput3} from '@blueprintjs/datetime2';
import {DATE_FORMAT, TIMELINE_ORIGIN_MIN} from '@shared/constants';
import clsx from 'clsx';
import enUS from 'date-fns/locale/en-US';
import {useMemo} from 'react';
import {formatDateToString} from 'src/utils/datetime.ts';

import styles from './date-picker.module.scss';

interface Props {
  readonly value: string;
  readonly onChange: (value: string | null) => void;
  readonly intent?: Intent;
  readonly small?: boolean;
}

export function DatePicker({
  value,
  onChange,
  intent = 'none',
  small = false,
}: Props) {
  const className = useMemo(() => {
    if (intent === 'danger') {
      return Classes.INTENT_DANGER;
    }

    if (intent === 'success') {
      return Classes.INTENT_SUCCESS;
    }
  }, [intent]);

  return (
    <DateInput3
      className={clsx(className, small && styles.small)}
      minDate={TIMELINE_ORIGIN_MIN}
      onChange={(v) => {
        if (v === null) {
          return onChange(null);
        }

        const formatted = formatDateToString(new Date(v));
        onChange(formatted);
      }}
      locale={enUS}
      value={value}
      dateFnsFormat={DATE_FORMAT}
      timePrecision="second"
      showTimezoneSelect={false}
    />
  );
}
