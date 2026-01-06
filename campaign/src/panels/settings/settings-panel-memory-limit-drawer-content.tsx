import {DrawerContent} from 'src/primitives/drawer-content.tsx';

export function SettingsPanelMemoryLimitDrawerContent() {
  return (
    <DrawerContent
      items={[
        {
          index: 0,
          title: null,
          body: 'The memory limit to apply when computing the mean distances matrix.',
        },
      ]}
    />
  );
}
