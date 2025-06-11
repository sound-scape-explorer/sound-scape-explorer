import {Button, Drawer as BaseDrawer} from '@blueprintjs/core';
import {Cross, Help} from '@blueprintjs/icons';
import {ICON_SIZE} from '@shared/constants';
import clsx from 'clsx';
import {JSX, useState} from 'react';
import {useTheme} from 'src/hooks/use-theme';

interface Props {
  children: JSX.Element;
}

export function HelpDrawer({children}: Props) {
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {isDark} = useTheme();

  return (
    <div>
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleOpen();
        }}
      >
        <Button icon={<Help size={ICON_SIZE} />} />
      </div>

      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
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
            {children}
          </div>
        </BaseDrawer>
      </div>
    </div>
  );
}
