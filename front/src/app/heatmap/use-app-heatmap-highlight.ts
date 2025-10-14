import compare from 'just-compare';
import {useTagSelection} from 'src/draggables/tags/use-tag-selection';
import {ref} from 'vue';

interface Highlight {
  row?: {
    tagName: string;
    tagValue: string;
    tagIndex: number;
  };
  col?: {
    tagName: string;
    tagValue: string;
    tagIndex: number;
  };
}

const highlight = ref<Highlight>({});

export function useAppHeatmapHighlight() {
  const {updateSelection: updateTag} = useTagSelection();

  const getShapes = () => {
    if (!highlight.value.row || !highlight.value.col) {
      return;
    }

    const x = highlight.value.row.tagIndex;
    const y = highlight.value.col.tagIndex;

    if (x === null || y === null) {
      return [];
    }

    const shape = {
      type: 'rect' as const,
      x0: x - 0.5,
      x1: x + 0.5,
      y0: y - 0.5,
      y1: y + 0.5,
      line: {
        color: 'red',
        width: 1,
      },
      fillcolor: 'rgba(0, 0, 0, 0)',
    };

    return [shape];
  };

  const updateHighlight = (newHighlight: Highlight) => {
    const isSame = compare(highlight.value, newHighlight);

    if (isSame) {
      reset();

      return;
    }

    highlight.value = newHighlight;
  };

  const reset = () => {
    if (highlight.value.row) {
      updateTag(highlight.value.row.tagName, []);
    }

    if (highlight.value.col) {
      updateTag(highlight.value.col.tagName, []);
    }

    highlight.value = {};
  };

  return {
    highlight,
    updateHighlight,
    getShapes,
    reset,
  };
}
