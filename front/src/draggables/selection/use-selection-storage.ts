import {downloadJson} from '@shared/browser';
import {getStorageFilename, readJson} from '@shared/files';
import {useConfig} from 'src/composables/use-config';
import {useSelectionState} from 'src/draggables/selection/use-selection-state';
import {ref} from 'vue';
import {z} from 'zod';

export const SelectionDto = z.object({
  name: z.string(), // unique
  xRange: z.tuple([z.number(), z.number()]),
  yRange: z.tuple([z.number(), z.number()]),
  zRange: z.tuple([z.number(), z.number()]),
  xAngle: z.number(),
  yAngle: z.number(),
  zAngle: z.number(),
});

// eslint-disable-next-line no-redeclare
export type SelectionDto = z.infer<typeof SelectionDto>;

export const SelectionsDto = z.array(SelectionDto);

// eslint-disable-next-line no-redeclare
export type SelectionsDto = z.infer<typeof SelectionsDto>;

const selections = ref<SelectionsDto>([]);

export function useSelectionStorage() {
  const {name, xRange, yRange, zRange, xAngle, yAngle, zAngle} =
    useSelectionState();
  const {config} = useConfig();

  const save = () => {
    const found = selections.value.find((s) => s.name === name.value);

    if (!found) {
      const s = {
        name: name.value,
        xRange: xRange.value,
        yRange: yRange.value,
        zRange: zRange.value,
        xAngle: xAngle.value,
        yAngle: yAngle.value,
        zAngle: zAngle.value,
      };

      selections.value.push(s);

      return;
    }

    found.name = name.value;
    found.xRange = xRange.value;
    found.yRange = yRange.value;
    found.zRange = zRange.value;
    found.xAngle = xAngle.value;
    found.yAngle = yAngle.value;
    found.zAngle = zAngle.value;
  };

  const remove = () => {
    const found = selections.value.find((s) => s.name === name.value);

    if (!found) {
      return;
    }

    selections.value = selections.value.filter((s) => s.name !== name.value);
  };

  const use = (s: SelectionDto) => {
    name.value = s.name;
    xRange.value = s.xRange;
    yRange.value = s.yRange;
    zRange.value = s.zRange;
    xAngle.value = s.xAngle;
    yAngle.value = s.yAngle;
    zAngle.value = s.zAngle;
  };

  const exportJson = () => {
    if (selections.value.length === 0 || config.value === null) {
      return;
    }

    const filename = getStorageFilename(config.value);
    downloadJson(selections.value, `${filename}-selections`);
  };

  const importJson = (file: File) => {
    readJson(file, (e) => {
      const result = e.target?.result;

      if (typeof result === 'undefined' || typeof result !== 'string') {
        return;
      }

      const json = JSON.parse(result);
      const data = SelectionsDto.parse(json);
      selections.value = data;
      use(selections.value[0]);
    });
  };

  return {
    selections,
    remove,
    save,
    use,
    exportJson,
    importJson,
  };
}
