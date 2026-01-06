import {DrawerContent} from 'src/primitives/drawer-content.tsx';
import {Link} from 'src/primitives/link.tsx';

export function ExtractionAutoclustersDrawerContent() {
  return (
    <DrawerContent
      items={[
        {
          index: 0,
          title: 'HDBSCAN',
          body: (
            <div className="flex column">
              <span>
                Cluster data using hierarchical density-based clustering.
              </span>
              <Link href="https://scikit-learn.org/stable/modules/generated/sklearn.cluster.HDBSCAN.html">
                scikit-learn doc
              </Link>
            </div>
          ),
        },
      ]}
    />
  );
}
