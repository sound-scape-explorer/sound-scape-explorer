import {ComputationStrategy} from '@shared/enums';
import {DrawerContent} from 'src/primitives/drawer-content.tsx';

export function SettingsComputationsDrawerContent() {
  return (
    <DrawerContent
      content={[
        [
          'Computations',
          <div
            key="computations"
            className="flex column"
          >
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
          </div>,
        ],
        [
          <div key="umap">
            <b>{ComputationStrategy.enum.UMAP}</b> strategy
          </div>,
          'Reduce dimensions using UMAP.',
        ],
        [
          <div key="pca">
            <b>{ComputationStrategy.enum.PCA}</b> strategy
          </div>,
          'Reduce dimensions using PCA.',
        ],
        [
          <div key="embeddings">
            <b>{ComputationStrategy.enum.EMBEDDINGS}</b> strategy
          </div>,
          'Do not reduce dimensions and use embeddings from the extraction directly.',
        ],
      ]}
    />
  );
}
