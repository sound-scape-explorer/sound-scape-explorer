import {type Intent} from '@blueprintjs/core';
import {useCallback} from 'react';
import {useToaster} from 'src/hooks/use-toaster.ts';

export function useNotify() {
  const {toaster} = useToaster();

  const notify = useCallback(
    (message: string, intent: Intent = 'none') => {
      if (toaster === null) {
        return;
      }

      toaster.show({message, intent});
    },
    [toaster],
  );

  return {
    notify,
  };
}
