import {Card} from '@blueprintjs/core';
import {MetricsAutoclusters} from 'src/panels/metrics/components/metrics-autoclusters.tsx';
import {MetricsDigesters} from 'src/panels/metrics/components/metrics-digesters.tsx';
import {MetricsExtractors} from 'src/panels/metrics/components/metrics-extractors.tsx';
import {MetricsRanges} from 'src/panels/metrics/components/metrics-ranges.tsx';
import {MetricsTrajectories} from 'src/panels/metrics/components/metrics-trajectories.tsx';

export function MetricsPanel() {
  return (
    <Card className="flex column gap">
      <MetricsRanges />
      <MetricsAutoclusters />
      <MetricsDigesters />
      <MetricsTrajectories />
      <MetricsExtractors />
    </Card>
  );
}
