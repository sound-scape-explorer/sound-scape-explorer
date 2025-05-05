import {OverlayToaster} from '@blueprintjs/core';
import {useLayoutEffect, useRef} from 'react';
import {useToaster} from 'src/hooks/use-toaster';

export function Toaster() {
  const ref = useRef<OverlayToaster | null>(null);
  const {setToaster} = useToaster();

  useLayoutEffect(() => {
    if (ref.current === null) {
      return;
    }

    setToaster(ref.current);
  }, [ref, setToaster]);

  return (
    <OverlayToaster
      usePortal
      canEscapeKeyClear
      position="top"
      ref={ref}
    />
  );
}
