import {darkTheme, type GlobalThemeOverrides} from 'naive-ui';
import {useClientSettings} from 'src/composables/use-client-settings';

export function useThemeProvider() {
  const {darkMode} = useClientSettings();

  const commonOverrides: GlobalThemeOverrides = {
    common: {
      primaryColor: 'rgba(23,159,87,0.2)', // olive light
      actionColor: 'rgba(23,159,87,0.4)', // olive
      pressedColor: 'rgb(23,159,87)', // emerald
      errorColor: 'rgba(255,0,0,0.2)', // red
    },
  };

  const lightThemeOverrides: GlobalThemeOverrides = {
    common: {
      ...commonOverrides.common,
      baseColor: 'rgba(255,255,255,0.7)', // white
      modalColor: 'rgba(255,255,255,0.9)', // white opaque
      borderColor: 'rgba(0,0,0,0.1)', // grey
      boxShadow1: 'rgba(0,0,0,0.05)', // grey light
      boxShadow2: 'rgba(0,0,0,0.2)', // grey deep
      boxShadow3: 'rgba(0,0,0,0.1)', // grey
    },
    Tooltip: {
      color: 'rgba(255,255,255,0.7)', // white
    },
  };

  const darkThemeOverrides: GlobalThemeOverrides = {
    common: {
      ...commonOverrides.common,
      baseColor: 'rgba(0,0,0)', // black opaque
      modalColor: 'rgba(0,0,0,0.7)', // black
      borderColor: 'rgba(255,255,255,0.4)', // grey
      boxShadow1: 'rgba(40,40,40,0.05)', // grey light
      boxShadow2: 'rgba(40,40,40,0.2)', // grey deep
      boxShadow3: 'rgba(40,40,40,0.1)', // grey
    },
    Tooltip: {
      color: 'rgba(0,0,0)', // black opaque
    },
  };

  const theme = darkMode.value ? darkTheme : null;

  return {
    lightThemeOverrides,
    darkThemeOverrides,
    theme,
  };
}
