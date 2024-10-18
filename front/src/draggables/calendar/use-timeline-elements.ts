export interface TimelineElement {
  row: number;
  start: number;
  end: number;
  color: string;
  tooltip: string[];
}

const elements: TimelineElement[] = [
  {row: 1, start: 0, end: 24, color: '#ff7f50', tooltip: ['row1']},
  {
    row: 2,
    start: 24,
    end: 48,
    color: '#6495ed',
    tooltip: ['row2', 'additional line'],
  },
  {
    row: 3,
    start: 3,
    end: 15,
    color: '#32cd32',
    tooltip: ['row3', 'very long long long long long long long text'],
  },
  {
    row: 4,
    start: 0,
    end: 36,
    color: '#ba55d3',
    tooltip: [],
  },
];

export function useTimelineElements() {
  return {
    elements: elements,
  };
}
