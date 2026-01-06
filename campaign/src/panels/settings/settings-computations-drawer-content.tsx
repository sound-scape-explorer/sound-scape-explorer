import {ComputationStrategy} from '@shared/enums';
import {DrawerContent} from 'src/primitives/drawer-content.tsx';

export function SettingsComputationsDrawerContent() {
  return (
    <DrawerContent
      items={[
        {
          index: 0,
          title: 'Computations',
          body: (
            <div className="flex column">
              <span>
                Computations are an additional process for the autoclustering
                feature and metrics like Silhouette.
              </span>
              <span>
                It takes the extraction embeddings as input and aims to generate
                consistent reductions according to the <code>iterations</code>
                ,&nbsp;
                <code>dimensions</code> and <code>strategy</code> parameters.
              </span>
            </div>
          ),
        },
        {
          index: 1,
          title: (
            <div>
              <b>{ComputationStrategy.enum.UMAP}</b> strategy
            </div>
          ),
          body: 'Reduce dimensions using UMAP.',
        },
        {
          index: 2,
          title: (
            <div>
              <b>{ComputationStrategy.enum.PCA}</b> strategy
            </div>
          ),
          body: 'Reduce dimensions using PCA.',
        },
        {
          index: 3,
          title: (
            <div>
              <b>{ComputationStrategy.enum.EMBEDDINGS}</b> strategy
            </div>
          ),
          body: 'Do not reduce dimensions and use embeddings from the extraction directly.',
        },
      ]}
    />
  );
}
