import {Card} from '@blueprintjs/core';
import {MetricsCallout} from 'src/components/metrics-callout.tsx';
import {MetricsAutoclusters} from 'src/panels/metrics/components/metrics-autoclusters.tsx';
import {MetricsDigesters} from 'src/panels/metrics/components/metrics-digesters.tsx';
import {MetricsIndices} from 'src/panels/metrics/components/metrics-indices.tsx';
import {MetricsRanges} from 'src/panels/metrics/components/metrics-ranges.tsx';
import {MetricsTrajectories} from 'src/panels/metrics/components/metrics-trajectories.tsx';

export function MetricsPanel() {
  return (
    <Card className="flex column gap">
      <MetricsCallout />
      <MetricsRanges />
      <MetricsAutoclusters />
      <MetricsDigesters />
      <MetricsTrajectories />
      <MetricsIndices />
    </Card>
  );
}
