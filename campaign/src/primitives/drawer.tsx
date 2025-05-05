import {Button, Drawer as BaseDrawer} from '@blueprintjs/core';
import {Cross} from '@blueprintjs/icons';
import {ICON_SIZE} from '@shared/constants';
import clsx from 'clsx';
import {JSX, useState} from 'react';
import {useTheme} from 'src/hooks/use-theme';

interface Props {
  content: JSX.Element;
  children: JSX.Element;
}

export function Drawer({content, children}: Props) {
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {isDark} = useTheme();

  return (
    <>
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleOpen();
        }}
      >
        {children}
      </div>
      <BaseDrawer
        className={clsx(isDark && 'bp5-dark', 'scrollable')}
        isOpen={isOpen}
        onClose={handleClose}
        canEscapeKeyClose
        canOutsideClickClose
      >
        <div className="p">
          <Button
            className="w0"
            onClick={handleClose}
            icon={<Cross size={ICON_SIZE} />}
          />
          {content}
        </div>
      </BaseDrawer>
    </>
  );
}
