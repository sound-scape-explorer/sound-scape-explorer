import {darkTheme, type GlobalThemeOverrides} from 'naive-ui';
import {useClientSettings} from 'src/composables/use-client-settings';

const gen = (min: number, max: number, isDark: boolean = false) => {
  const base = `rgba(${max},${max},${max},0.7)`;
  const modal = `rgba(${max},${max},${max}, 0.98)`;

  return {
    common: {
      primaryColor: 'rgba(23,159,87,0.8)', // olive light
      actionColor: 'rgba(23,159,87,0.4)', // olive
      pressedColor: 'rgb(23,159,87)', // emerald
      errorColor: 'rgba(255,0,0,0.2)', // red
      textColorBase: `rgb(${min},${min},${min})`,
      baseColor: isDark ? modal : base,
      modalColor: isDark ? base : modal,
      borderColor: `rgba(${min},${min},${min},0.33)`,
      boxShadow1: `rgba(${min},${min},${min},0.05)`,
      boxShadow2: `rgba(${min},${min},${min},0.1)`,
    },
    Tooltip: {
      color: `rgb(${max},${max},${max})`,
      textColor: `rgb(${min},${min},${min})`,
    },
  };
};

export function useThemeProvider() {
  const {darkMode} = useClientSettings();

  const lightThemeOverrides: GlobalThemeOverrides = gen(2, 255);
  const darkThemeOverrides: GlobalThemeOverrides = gen(200, 3, true);

  const theme = darkMode.value ? darkTheme : null;

  return {
    lightThemeOverrides,
    darkThemeOverrides,
    theme,
  };
}
