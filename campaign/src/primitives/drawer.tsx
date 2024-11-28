import {Button, Drawer as BDrawer} from '@blueprintjs/core';
import {Cross} from '@blueprintjs/icons';
import {JSX, useState} from 'react';
import {ICON_SIZE} from 'src/constants.ts';

interface Props {
  content: JSX.Element;
  children: JSX.Element;
}

export function Drawer({content, children}: Props) {
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div onClick={handleOpen}>{children}</div>
      <BDrawer
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
      </BDrawer>
    </>
  );
}
