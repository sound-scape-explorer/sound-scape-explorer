import {DrawerContent} from 'src/primitives/drawer-content';

export function SettingsPanelStoragePathDrawerContent() {
  return (
    <DrawerContent
      content={[
        [
          'Examples',
          <div
            key="examples"
            className="flex column gap"
          >
            <div>
              <code>storage.h5</code>
            </div>
            <div>
              <code>/home/user/sse/my_campaign/storage.h5</code>
            </div>
            <div>
              <code>D:\sse\my_campaign\storage.h5</code>
            </div>
          </div>,
        ],
      ]}
    />
  );
}
