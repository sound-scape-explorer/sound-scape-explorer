<script lang="ts" setup>
import Array from '@blueprintjs/icons/lib/esm/generated/16px/paths/array';
import Calculator from '@blueprintjs/icons/lib/esm/generated/16px/paths/calculator';
import Calendar from '@blueprintjs/icons/lib/esm/generated/16px/paths/calendar';
import ChevronRight from '@blueprintjs/icons/lib/esm/generated/16px/paths/chevron-right';
import Clean from '@blueprintjs/icons/lib/esm/generated/16px/paths/clean';
import Cog from '@blueprintjs/icons/lib/esm/generated/16px/paths/cog';
import ColorFill from '@blueprintjs/icons/lib/esm/generated/16px/paths/color-fill';
import Cross from '@blueprintjs/icons/lib/esm/generated/16px/paths/cross';
import Delta from '@blueprintjs/icons/lib/esm/generated/16px/paths/delta';
import Detection from '@blueprintjs/icons/lib/esm/generated/16px/paths/detection';
import DocumentOpen from '@blueprintjs/icons/lib/esm/generated/16px/paths/document-open';
import DoubleCaretHorizontal from '@blueprintjs/icons/lib/esm/generated/16px/paths/double-caret-horizontal';
import DoubleCaretVertical from '@blueprintjs/icons/lib/esm/generated/16px/paths/double-caret-vertical';
import Download from '@blueprintjs/icons/lib/esm/generated/16px/paths/download';
import Error from '@blueprintjs/icons/lib/esm/generated/16px/paths/error';
import Exchange from '@blueprintjs/icons/lib/esm/generated/16px/paths/exchange';
import Export from '@blueprintjs/icons/lib/esm/generated/16px/paths/export';
import EyeOff from '@blueprintjs/icons/lib/esm/generated/16px/paths/eye-off';
import EyeOn from '@blueprintjs/icons/lib/esm/generated/16px/paths/eye-on';
import EyeOpen from '@blueprintjs/icons/lib/esm/generated/16px/paths/eye-open';
import HeatGrid from '@blueprintjs/icons/lib/esm/generated/16px/paths/heat-grid';
import Help from '@blueprintjs/icons/lib/esm/generated/16px/paths/help';
import Import from '@blueprintjs/icons/lib/esm/generated/16px/paths/import';
import Layout from '@blueprintjs/icons/lib/esm/generated/16px/paths/layout';
import LayoutBalloon from '@blueprintjs/icons/lib/esm/generated/16px/paths/layout-balloon';
import Maximize from '@blueprintjs/icons/lib/esm/generated/16px/paths/maximize';
import Minimize from '@blueprintjs/icons/lib/esm/generated/16px/paths/minimize';
import Minus from '@blueprintjs/icons/lib/esm/generated/16px/paths/minus';
import Move from '@blueprintjs/icons/lib/esm/generated/16px/paths/move';
import Music from '@blueprintjs/icons/lib/esm/generated/16px/paths/music';
import NewLink from '@blueprintjs/icons/lib/esm/generated/16px/paths/new-link';
import Pause from '@blueprintjs/icons/lib/esm/generated/16px/paths/pause';
import Play from '@blueprintjs/icons/lib/esm/generated/16px/paths/play';
import Plus from '@blueprintjs/icons/lib/esm/generated/16px/paths/plus';
import Redo from '@blueprintjs/icons/lib/esm/generated/16px/paths/redo';
import Refresh from '@blueprintjs/icons/lib/esm/generated/16px/paths/refresh';
import Reset from '@blueprintjs/icons/lib/esm/generated/16px/paths/reset';
import SelectionBox from '@blueprintjs/icons/lib/esm/generated/16px/paths/selection-box';
import SeriesFiltered from '@blueprintjs/icons/lib/esm/generated/16px/paths/series-filtered';
import StepBackward from '@blueprintjs/icons/lib/esm/generated/16px/paths/step-backward';
import StepForward from '@blueprintjs/icons/lib/esm/generated/16px/paths/step-forward';
import Stop from '@blueprintjs/icons/lib/esm/generated/16px/paths/stop';
import Tags from '@blueprintjs/icons/lib/esm/generated/16px/paths/tags';
import TimelineBarChart from '@blueprintjs/icons/lib/esm/generated/16px/paths/timeline-bar-chart';
import Undo from '@blueprintjs/icons/lib/esm/generated/16px/paths/undo';
import VolumeDown from '@blueprintjs/icons/lib/esm/generated/16px/paths/volume-down';
import VolumeUp from '@blueprintjs/icons/lib/esm/generated/16px/paths/volume-up';
import Waves from '@blueprintjs/icons/lib/esm/generated/16px/paths/waves';
import {DraggableKey} from 'src/composables/use-draggables';
import {useThemeColors} from 'src/composables/use-theme-colors';
import {computed} from 'vue';
import {z} from 'zod';

const PathKey = z.enum([
  ...DraggableKey.options,
  'band',
  'integration',
  'reducer',
  'chevron',
  'clean',
  'swap',
  'close',
  'expand',
  'expandHorizontal',
  'expandVertical',
  'eyeOn',
  'eyeOff',
  'drag',
  'download',
  'refresh',
  'undo',
  'redo',
  'back',
  'forward',
  'volumeUp',
  'volumeDown',
  'play',
  'pause',
  'stop',
  'plus',
  'minus',
  'calculator',
  'detect',
  'reset',
  'error',
  'delta',
  'export',
  'import',
]);
// eslint-disable-next-line no-redeclare
type PathKey = z.infer<typeof PathKey>;

const paths: Record<PathKey, string[]> = {
  open: DocumentOpen,
  settings: Cog,
  help: Help,
  view: EyeOpen,
  colors: ColorFill,
  calendar: Calendar,
  tags: Tags,
  temporal: SeriesFiltered,
  heatmaps: HeatGrid,
  histograms: TimelineBarChart,
  audio: Music,
  details: Array,
  trajectories: Layout,
  relativeTrajectories: LayoutBalloon,
  selection: SelectionBox,
  // custom
  band: Waves,
  integration: NewLink,
  reducer: Minimize,
  // uniques
  chevron: ChevronRight,
  clean: Clean,
  swap: Exchange,
  close: Cross,
  expand: Maximize,
  expandHorizontal: DoubleCaretHorizontal,
  expandVertical: DoubleCaretVertical,
  eyeOn: EyeOn,
  eyeOff: EyeOff,
  drag: Move,
  download: Download,
  refresh: Refresh,
  undo: Undo,
  redo: Redo,
  back: StepBackward,
  forward: StepForward,
  volumeUp: VolumeUp,
  volumeDown: VolumeDown,
  play: Play,
  pause: Pause,
  stop: Stop,
  plus: Plus,
  minus: Minus,
  calculator: Calculator,
  detect: Detection,
  reset: Reset,
  error: Error,
  delta: Delta,
  import: Import,
  export: Export,
};

interface Props {
  icon: PathKey;
  color?: 'default' | 'active';
  size?: 'medium' | 'small' | 'tiny' | 'big' | 'giant';
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'open',
  color: 'default',
  size: 'medium',
});

const {colors} = useThemeColors();

const pixels = computed<number>(() => {
  if (props.size === 'tiny') {
    return 8;
  }

  if (props.size === 'small') {
    return 12;
  }

  if (props.size === 'big') {
    return 20;
  }

  if (props.size === 'giant') {
    return 24;
  }

  return 16;
});

const hex = computed<string>(() => {
  if (props.color === 'active') {
    return colors.value.pressedColor;
  }

  return colors.value.textColorBase;
});
</script>

<template>
  <svg
    :height="pixels"
    :width="pixels"
    viewBox="0 0 16 16"
  >
    <path
      :d="paths[props.icon][0]"
      :fill="hex"
    />
  </svg>
</template>
