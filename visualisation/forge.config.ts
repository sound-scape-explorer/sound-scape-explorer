import {MakerDeb} from '@electron-forge/maker-deb';
import {MakerDMG} from '@electron-forge/maker-dmg';
import MakerSquirrel from '@electron-forge/maker-squirrel';
import {VitePlugin} from '@electron-forge/plugin-vite';
import {type ForgeConfig} from '@electron-forge/shared-types';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import packageJson from '../package.json';
// noinspection ES6PreferShortImport
import {ElectronWindow} from './src/windows/ElectronWindow';

const name = packageJson.name;
const version = process.env?.NEXT_VERSION ?? '0.0.0';

const config: ForgeConfig = {
  packagerConfig: {
    executableName: name,
    appVersion: version,
    buildVersion: version,
    icon: ElectronWindow.iconPath,
  },
  rebuildConfig: {},
  makers: [
    new MakerDeb({
      options: {
        name,
        productName: name,
        genericName: name,
        version,
        icon: `${ElectronWindow.iconPath}.png`,
      },
    }),
    new MakerDMG({
      name,
      icon: `${ElectronWindow.iconPath}.icns`,
    }),
    new MakerSquirrel({
      name,
      version,
      title: name,
      setupIcon: `${ElectronWindow.iconPath}.ico`,
    }),
  ],
  plugins: [
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
          entry: 'src/main.ts',
          config: 'vite.main.config.ts',
        },
        {
          entry: 'src/preload/preload.ts',
          config: 'vite.preload.config.ts',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite.renderer.config.ts',
        },
      ],
    }),
  ],
};

export default config;
