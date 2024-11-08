// for plotly
export const colorMap = {
  green: 'rgba(0, 200, 100, 0.8)',
  transparent: (alpha: number) => `rgba(0, 0, 0, ${alpha})`,
  selected: (alpha: number) => `rgba(255, 0, 0, ${alpha})`,
  border: (alpha = 0.1) => `rgba(0, 0, 0, ${alpha})`,
  selectedBorder: 'red',
};
