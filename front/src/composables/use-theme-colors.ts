import {useThemeVars} from 'naive-ui';

export function useThemeColors() {
  const vars = useThemeVars();

  return {
    colors: vars,
  };
}
