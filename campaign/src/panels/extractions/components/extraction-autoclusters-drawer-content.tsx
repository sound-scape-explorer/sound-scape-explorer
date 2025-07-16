import {DrawerContent} from 'src/primitives/drawer-content.tsx';
import {Link} from 'src/primitives/link.tsx';

export function ExtractionAutoclustersDrawerContent() {
  return (
    <DrawerContent
      content={[
        [
          'HDBSCAN',
          <div
            className="flex column"
            key="HDBSCAN"
          >
            <span>
              Cluster data using hierarchical density-based clustering.
            </span>
            <Link href="https://scikit-learn.org/stable/modules/generated/sklearn.cluster.HDBSCAN.html">
              scikit-learn doc
            </Link>
          </div>,
        ],
      ]}
    />
  );
}
