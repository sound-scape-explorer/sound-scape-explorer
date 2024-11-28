import {DigesterType} from 'src/enums.ts';
import {AutoclusterType} from 'src/panels/metrics/hooks/use-autocluster-state';
import {type Trajectory} from 'src/types.ts';

export function isValidTrajectoryStep(input: string): boolean {
  return (input as Trajectory['step']) === input;
}

type DigesterTypeValue = (typeof DigesterType)[keyof typeof DigesterType];

export function isValidDigesterType(type: string): type is DigesterTypeValue {
  return Object.values(DigesterType).includes(type as DigesterType);
}

type AutoclusterTypeValue =
  (typeof AutoclusterType)[keyof typeof AutoclusterType];

export function isValidAutoclusterType(
  type: string,
): type is AutoclusterTypeValue {
  return Object.values(AutoclusterType).includes(type as AutoclusterType);
}
