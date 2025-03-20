import {ComputationStrategy} from '@shared/enums.ts';
import clsx from 'clsx';
import {useSettingsState} from 'src/hooks/use-settings-state.ts';
import styles from 'src/panels/settings/settings-panel.module.scss';
import {Drawer} from 'src/primitives/drawer.tsx';
import {
  DrawerContent,
  type DrawerContentProps,
} from 'src/primitives/drawer-content.tsx';
import {Select} from 'src/primitives/select.tsx';

const drawer: DrawerContentProps['content'] = [
  [
    null,
    'The computation step is needed to feed data for auto-clustering and acoustic indices algorithms.',
  ],
  [
    <>
      <b>{ComputationStrategy.Umap}</b> strategy
    </>,
    'Use the UMAP algorithm to reduce dimensions with the corresponding iterations.',
  ],
  [
    <>
      <b>{ComputationStrategy.Pca}</b> strategy
    </>,
    'Use the PCA algorithm to reduce dimensions with the corresponding iterations.',
  ],
  [
    <>
      <b>{ComputationStrategy.Embeddings}</b> strategy
    </>,
    'Use extractor primary embeddings directly.',
  ],
];

export function SettingsPanelComputationStrategy() {
  const {settings, update} = useSettingsState();

  return (
    <div className={clsx(styles.row, 'align gap')}>
      <Drawer content={<DrawerContent content={drawer} />}>
        <b className={clsx(styles.rowTitle, 'help grow flex')}>
          Comp. strategy
        </b>
      </Drawer>

      <Select<ComputationStrategy>
        current={settings.computationStrategy}
        items={Object.values(ComputationStrategy)}
        onSelect={(v) => update('computationStrategy', v)}
      />
    </div>
  );
}
