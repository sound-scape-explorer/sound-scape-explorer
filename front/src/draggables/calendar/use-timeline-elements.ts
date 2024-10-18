export interface TimelineElement {
  row: number;
  start: number;
  end: number;
  color: string;
}

const elements: TimelineElement[] = [
  {row: 1, start: 0, end: 24, color: '#ff7f50'},
  {row: 2, start: 26, end: 48, color: '#6495ed'},
  {row: 3, start: 3, end: 15, color: '#32cd32'},
  {row: 4, start: 0, end: 36, color: '#ba55d3'},
];

export function useTimelineElements() {
  return {
    elements: elements,
  };
}
