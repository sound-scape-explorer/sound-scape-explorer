import {isDarkModeEnabled} from '@shared/browser';
import {useStorage} from '@vueuse/core';
import {getStorageKey} from 'src/common/browser';
import {
  AUDIO_GAIN,
  AudioFilterSlope,
  ColorFlavor,
  PlotBackground,
  ScatterBorderWidth,
  SpectrogramColorMap,
  SpectrogramFftSize,
  TagsDraggableSize,
} from 'src/constants';
import {VERSION} from 'src/version';
import {type Ref} from 'vue';
import {z} from 'zod';

export const Settings = z.object({
  version: z.string().default(VERSION),
  darkMode: z.boolean().default(isDarkModeEnabled),
  plotBackground: PlotBackground.default(PlotBackground.enum.transparent),
  timeshift: z.number().default(0), // hours
  isDetailsAutoOpen: z.boolean().default(false),
  isAudioAutoOpen: z.boolean().default(true),
  isWebGlScatter2d: z.boolean().default(true),
  isColorMapSwapped: z.boolean().default(false),
  spectrogramFftSize: SpectrogramFftSize.default(
    SpectrogramFftSize.enum['4096'],
  ),
  spectrogramColorMap: SpectrogramColorMap.default(
    SpectrogramColorMap.enum.hot,
  ),
  audioHost: z
    .url()
    .transform((url) => url.replace(/\/$/, ''))
    .default('http://localhost:5531'),
  plotFontSize: z.number().default(12),
  decibelsDisplay: z.boolean().default(true),
  legendOverflow: z.boolean().default(false),
  tagsDraggableSizeHorizontal: TagsDraggableSize.default(
    TagsDraggableSize.enum.small,
  ),
  tagsDraggableSizeVertical: TagsDraggableSize.default(
    TagsDraggableSize.enum.small,
  ),
  colorsFlavor: ColorFlavor.default(ColorFlavor.enum.Spectral),
  colorsAlphaLow: z.number().default(0.005),
  colorsAlphaHigh: z.number().default(0.8),
  isHidingMenuOnDraggableToggle: z.boolean().default(false),
  isDevEnabled: z.boolean().default(false),
  devAutoLoadView: z.boolean().default(false),
  isSelectedPointHighlighted: z.boolean().default(true),
  isDetailedExportName: z.boolean().default(true),
  scatterBorderWidth: ScatterBorderWidth.default(ScatterBorderWidth.enum['1']),
  audioGain: z
    .number()
    .min(AUDIO_GAIN.min)
    .max(AUDIO_GAIN.max)
    .default(AUDIO_GAIN.default),
  audioFilterSlope: AudioFilterSlope.default(AudioFilterSlope.enum['12']),
});

// eslint-disable-next-line no-redeclare
export type Settings = z.infer<typeof Settings>;
type SettingsRefs = {
  [K in keyof Settings]: Ref<Settings[K]>;
};

// factory
export function createSettingsRefs(): SettingsRefs {
  const shape = Settings.shape;

  const entries = Object.entries(shape).map(([key, schema]) => {
    const ref = useStorage(
      `${getStorageKey('SETTINGS')}-${key}`,
      schema.parse(undefined),
      undefined,
      {
        serializer: {
          read: (value: string) => {
            try {
              return schema.parse(JSON.parse(value));
            } catch {
              // TODO: improve handling because this is not ref state
              console.warn(
                `Invalid stored value for ${key}, using default`,
                key,
                value,
              );
              return schema.parse(undefined);
            }
          },
          write: (value: unknown) => JSON.stringify(value),
        },
      },
    );

    return [key, ref];
  });

  return Object.fromEntries(entries);
}
