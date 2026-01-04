import {MetricImpl} from '@shared/enums';
import {DrawerContent} from 'src/primitives/drawer-content.tsx';
import {Link} from 'src/primitives/link.tsx';

export function ExtractionMetricsDrawerContent() {
  return (
    <DrawerContent
      items={[
        {
          index: 0,
          title: MetricImpl.enum.MEAN_STD,
          body: 'The mean standard deviation.',
        },
        {
          index: 1,
          title: MetricImpl.enum.MEAN_SPREADING,
          body: 'The mean spreading.',
        },
        {
          index: 2,
          title: MetricImpl.enum.SILHOUETTE,
          body: (
            <div className="flex column">
              <span>The silhouette between subtypes of a given cluster.</span>
              <Link href="https://scikit-learn.org/stable/modules/generated/sklearn.metrics.silhouette_score.html">
                scikit-learn doc
              </Link>
            </div>
          ),
        },
        {
          index: 3,
          title: MetricImpl.enum.CONTINGENCY,
          body: (
            <div className="flex column">
              <span>Contingency between two clusters.</span>
              <Link href="https://scikit-learn.org/stable/modules/generated/sklearn.metrics.cluster.contingency_matrix.html">
                scikit-learn doc
              </Link>
            </div>
          ),
        },
        {
          index: 4,
          title: MetricImpl.enum.OVERLAP,
          body: 'The overlap between subtypes of a given cluster.',
        },
      ]}
    />
  );
}
