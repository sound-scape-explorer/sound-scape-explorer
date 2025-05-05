import {DrawerContent} from 'src/primitives/drawer-content.tsx';

export function SettingsPanelAudioPathDrawerContent() {
  return (
    <DrawerContent
      content={[
        [
          'How to update?',
          'Drag a folder onto the input field to change its value.',
        ],
        [
          'Validation',
          'Status is valid when the full paths from audio folder and audio paths exist.',
        ],
      ]}
    />
  );
}
