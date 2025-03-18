import {Callout, H5} from '@blueprintjs/core';
import clsx from 'clsx';
import {ComputationStrategy} from 'src/enums.ts';
import {useSettingsState} from 'src/hooks/use-settings-state.ts';
import styles from 'src/panels/settings/settings-panel.module.scss';
import {Drawer} from 'src/primitives/drawer.tsx';
import {Select} from 'src/primitives/select.tsx';

export function SettingsPanelComputationStrategy() {
  const {settings, update} = useSettingsState();

  return (
    <div className={clsx(styles.row, 'align gap')}>
      <Drawer
        content={
          <div className="flex column gap mt">
            <Callout compact>
              <div>
                The computation step is needed to feed data for auto-clustering
                and acoustic indices algorithms.
              </div>
            </Callout>
            <Callout compact>
              <H5>
                <b>{ComputationStrategy.Umap}</b> strategy
              </H5>
              <div>
                Use the UMAP algorithm to reduce dimensions with the
                corresponding iterations.
              </div>
            </Callout>
            <Callout compact>
              <H5>
                <b>{ComputationStrategy.Pca}</b> strategy
              </H5>
              <div>
                Use the PCA algorithm to reduce dimensions with the
                corresponding iterations.
              </div>
            </Callout>
            <Callout compact>
              <H5>
                <b>{ComputationStrategy.Embeddings}</b> strategy
              </H5>
              <div>Use extractor primary embeddings directly.</div>
            </Callout>
          </div>
        }
      >
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
