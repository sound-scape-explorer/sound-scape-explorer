import {DrawerContent} from 'src/primitives/drawer-content.tsx';

export function SettingsPanelAudioPathDrawerContent() {
  return (
    <DrawerContent
      items={[
        {
          index: 0,
          title: 'How to update?',
          body: 'Drag a folder onto the input field to change its value. You can also edit the text field manually.',
        },
        {
          index: 1,
          title: 'Validation',
          body: 'Status is valid when the full paths from audio folder and audio paths exist.',
        },
      ]}
    />
  );
}
