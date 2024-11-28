import {Input} from 'src/components/primitives/input.tsx';
import {useExtractorReducerPicker} from 'src/components/settings/extractors/hooks/use-extractor-reducer-picker.ts';
import {REDUCER_NONE, REDUCERS} from 'src/constants.ts';
import {type Extractor} from 'src/types.ts';

export interface ExtractorReducerPickerProps {
  extractor: Extractor;
}

export function ExtractorReducerPicker({
  extractor,
}: ExtractorReducerPickerProps) {
  const {nameRef, dimensionsRef, update} = useExtractorReducerPicker({
    extractor,
  });

  return (
    <>
      <select
        ref={nameRef}
        defaultValue={
          extractor.reducer?.name ? extractor.reducer.name : REDUCER_NONE
        }
        onChange={update}
      >
        <option value={REDUCER_NONE}>{REDUCER_NONE}</option>
        {REDUCERS.map((r) => (
          <option
            key={r}
            value={r}
          >
            {r}
          </option>
        ))}
      </select>

      <Input
        ref={dimensionsRef}
        type="number"
        placeholder="dimensions"
        onChange={update}
        defaultValue={
          extractor.reducer?.dimensions ? extractor.reducer.dimensions : 0
        }
      />
    </>
  );
}
