import {Button, Section} from '@blueprintjs/core';
import {SectionCard} from '@blueprintjs/core/lib/esnext';
import {ArrowDown, ArrowUp, Cog, Cross} from '@blueprintjs/icons';
import {ICON_SIZE} from '@shared/constants';
import {type ExtractorDto} from '@shared/dtos';
import {ExtractorImplEnum} from '@shared/enums';
import clsx from 'clsx';
import {useEffect, useMemo, useState} from 'react';
import {useTheme} from 'src/hooks/use-theme';
import {ExtractionExtractorAdiParams} from 'src/panels/extractions/components/extraction-extractor-adi-params.tsx';
import {ExtractionExtractorHtParams} from 'src/panels/extractions/components/extraction-extractor-ht-params.tsx';
import {ExtractionExtractorLeqDiffParams} from 'src/panels/extractions/components/extraction-extractor-leq-diff-params.tsx';
import {ExtractionExtractorLeqPercentileParams} from 'src/panels/extractions/components/extraction-extractor-leq-percentile-params.tsx';
import {ExtractionExtractorMedParams} from 'src/panels/extractions/components/extraction-extractor-med-params.tsx';
import {ExtractionExtractorMfccParams} from 'src/panels/extractions/components/extraction-extractor-mfcc-params.tsx';
import {ExtractionExtractorMpsParams} from 'src/panels/extractions/components/extraction-extractor-mps-params.tsx';
import {ExtractionExtractorNdsiParams} from 'src/panels/extractions/components/extraction-extractor-ndsi-params.tsx';
import {ExtractionExtractorSpectrogramParams} from 'src/panels/extractions/components/extraction-extractor-spectrogram-params.tsx';
import {ExtractionExtractorSpectrumParams} from 'src/panels/extractions/components/extraction-extractor-spectrum-params.tsx';
import {type ExtractionConfigWithId} from 'src/panels/extractions/hooks/use-extraction-state.ts';
import {useExtractionTemplates} from 'src/panels/extractions/hooks/use-extraction-templates.ts';
import {useExtractorState} from 'src/panels/extractions/hooks/use-extractor-state.ts';
import {useExtractorValidation} from 'src/panels/extractions/hooks/use-extractor-validation.ts';
import genericStyles from 'src/primitives/generic-section/generic-section.module.scss';
import {NumberReactiveInput} from 'src/primitives/number-reactive-input.tsx';
import {Select} from 'src/primitives/select.tsx';
import {TextInput} from 'src/primitives/text-input.tsx';

import styles from './config-extractors.module.scss';

interface Props {
  extraction: ExtractionConfigWithId;
  extractor: ExtractorDto;
}

const EXTRACTORS_LOCKED: ExtractorImplEnum[] = [
  ExtractorImplEnum.enum.BIRDNET,
  ExtractorImplEnum.enum.PERCH,
  ExtractorImplEnum.enum.SURF_PERCH,
  ExtractorImplEnum.enum.VGGISH,
  ExtractorImplEnum.enum.YAMNET,
  ExtractorImplEnum.enum.MUSIC_CLASS,
];

const EXTRACTOR_ADDITIONAL_PARAMS: ExtractorImplEnum[] = [
  ExtractorImplEnum.enum.SPECTRUM,
  ExtractorImplEnum.enum.SPECTROGRAM,
  ExtractorImplEnum.enum.MPS,
  ExtractorImplEnum.enum.MFCC,
  ExtractorImplEnum.enum.NDSI,
  ExtractorImplEnum.enum.ADI,
  ExtractorImplEnum.enum.HT,
  ExtractorImplEnum.enum.MED,
  ExtractorImplEnum.enum.LEQ_PERCENTILE,
  ExtractorImplEnum.enum.LEQ_DIFF,
];

export function ExtractionExtractorCard({extraction, extractor}: Props) {
  const {
    deleteExtractor,
    updateIndex,
    updateName,
    updateImpl,
    updateWindow,
    updateHop,
  } = useExtractorState(extraction);
  const {isNameValid, isWindowValid, isHopValid} = useExtractorValidation();
  const {hasTemplate} = useExtractionTemplates(extraction);
  const {isDark} = useTheme();

  const isLocked = useMemo(
    () => EXTRACTORS_LOCKED.includes(extractor.impl),
    [extractor.impl],
  );

  const hasAdditionalParams = useMemo(
    () => EXTRACTOR_ADDITIONAL_PARAMS.includes(extractor.impl),
    [extractor.impl],
  );

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!hasAdditionalParams && open) {
      setOpen(false);
    }
  }, [hasAdditionalParams, open, setOpen]);

  return (
    <SectionCard className={clsx(genericStyles.row, styles.row)}>
      <div className="flex gap">
        <Button
          size="small"
          icon={<Cross size={ICON_SIZE} />}
          onClick={() => deleteExtractor(extractor)}
          disabled={hasTemplate}
        />
        <Button
          size="small"
          icon={<ArrowDown size={ICON_SIZE} />}
          onClick={() => updateIndex(extractor, +1)}
          disabled={hasTemplate}
        />
        <Button
          size="small"
          icon={<ArrowUp size={ICON_SIZE} />}
          onClick={() => updateIndex(extractor, -1)}
          disabled={hasTemplate}
        />
      </div>

      <span>{extractor.index}</span>

      <TextInput
        defaultValue={extractor.name}
        onBlur={(v) => updateName(extractor, v)}
        intent={isNameValid(extractor, extraction) ? 'success' : 'danger'}
        disabled={hasTemplate}
      />

      <Select
        items={ExtractorImplEnum.options}
        onSelect={(n) => updateImpl(extractor, n)}
        current={extractor.impl}
        placeholder="Select impl"
        disabled={hasTemplate}
      />

      <NumberReactiveInput
        value={extractor.window}
        onChange={(n) => updateWindow(extractor, n)}
        intent={isWindowValid(extractor) ? 'success' : 'danger'}
        disabled={hasTemplate || isLocked}
      />

      <NumberReactiveInput
        value={extractor.hop}
        onChange={(n) => updateHop(extractor, n)}
        intent={isHopValid(extractor) ? 'success' : 'danger'}
        disabled={hasTemplate}
      />

      <Button
        size="small"
        icon={<Cog size={ICON_SIZE} />}
        onClick={() => setOpen((o) => !o)}
        disabled={!hasAdditionalParams}
        className={clsx(open && 'bp5-active')}
      />

      <Section
        compact
        collapsible
        collapseProps={{
          isOpen: open,
        }}
        className={clsx(
          styles.additionalParamsContainer,
          isDark && styles.additionalParamsContainerDark,
        )}
      >
        {extractor.impl === ExtractorImplEnum.enum.SPECTRUM && (
          <ExtractionExtractorSpectrumParams
            extraction={extraction}
            extractor={extractor}
          />
        )}
        {extractor.impl === ExtractorImplEnum.enum.SPECTROGRAM && (
          <ExtractionExtractorSpectrogramParams
            extraction={extraction}
            extractor={extractor}
          />
        )}
        {extractor.impl === ExtractorImplEnum.enum.MPS && (
          <ExtractionExtractorMpsParams
            extraction={extraction}
            extractor={extractor}
          />
        )}
        {extractor.impl === ExtractorImplEnum.enum.MFCC && (
          <ExtractionExtractorMfccParams
            extraction={extraction}
            extractor={extractor}
          />
        )}
        {extractor.impl === ExtractorImplEnum.enum.NDSI && (
          <ExtractionExtractorNdsiParams
            extraction={extraction}
            extractor={extractor}
          />
        )}
        {extractor.impl === ExtractorImplEnum.enum.ADI && (
          <ExtractionExtractorAdiParams
            extraction={extraction}
            extractor={extractor}
          />
        )}
        {extractor.impl === ExtractorImplEnum.enum.HT && (
          <ExtractionExtractorHtParams
            extraction={extraction}
            extractor={extractor}
          />
        )}
        {extractor.impl === ExtractorImplEnum.enum.MED && (
          <ExtractionExtractorMedParams
            extraction={extraction}
            extractor={extractor}
          />
        )}
        {extractor.impl === ExtractorImplEnum.enum.LEQ_PERCENTILE && (
          <ExtractionExtractorLeqPercentileParams
            extraction={extraction}
            extractor={extractor}
          />
        )}
        {extractor.impl === ExtractorImplEnum.enum.LEQ_DIFF && (
          <ExtractionExtractorLeqDiffParams
            extraction={extraction}
            extractor={extractor}
          />
        )}
      </Section>
    </SectionCard>
  );
}
