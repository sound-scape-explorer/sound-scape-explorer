import {MetricImpl} from '@shared/enums';
import {DrawerContent} from 'src/primitives/drawer-content.tsx';
import {Link} from 'src/primitives/link.tsx';

export function ExtractionMetricsDrawerContent() {
  return (
    <DrawerContent
      content={[
        [MetricImpl.enum.MEAN_STD, 'The mean standard deviation.'],
        [MetricImpl.enum.MEAN_SPREADING, 'The mean spreading.'],
        [
          MetricImpl.enum.SILHOUETTE,
          <div
            className="flex column"
            key={MetricImpl.enum.SILHOUETTE}
          >
            <span>The silhouette between subtypes of a given cluster.</span>
            <Link href="https://scikit-learn.org/stable/modules/generated/sklearn.metrics.silhouette_score.html">
              scikit-learn doc
            </Link>
          </div>,
        ],

        [
          MetricImpl.enum.CONTINGENCY,
          <div
            className="flex column"
            key={MetricImpl.enum.CONTINGENCY}
          >
            <span>Contingency between two clusters.</span>
            <Link href="https://scikit-learn.org/stable/modules/generated/sklearn.metrics.cluster.contingency_matrix.html">
              scikit-learn doc
            </Link>
          </div>,
        ],
        [
          MetricImpl.enum.OVERLAP,
          'The overlap between subtypes of a given cluster.',
        ],
      ]}
    />
  );
}
