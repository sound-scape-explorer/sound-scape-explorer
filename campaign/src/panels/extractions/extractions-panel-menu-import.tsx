import {
  Button,
  Checkbox,
  CheckboxProps,
  Classes,
  Dialog,
  DialogBody,
  DialogFooter,
  FileInput,
  Intent,
} from '@blueprintjs/core';
import {JSON_TYPE} from '@shared/constants.ts';
import {ConfigDto, type ExtractionDto} from '@shared/dtos.ts';
import clsx from 'clsx';
import {FormEvent, useCallback, useState} from 'react';
import {useJsonDrop} from 'src/hooks/use-json-drop.ts';
import {useNotify} from 'src/hooks/use-notify.ts';
import {useTheme} from 'src/hooks/use-theme.ts';
import {useExtractionState} from 'src/panels/extractions/hooks/use-extraction-state.ts';

import styles from './extraction-panel-menu-import.module.scss';

export function ExtractionsPanelMenuImport() {
  const [isOpen, setIsOpen] = useState(false);
  const {isDark} = useTheme();
  const {notify} = useNotify();
  const {read} = useJsonDrop();
  const [extractions, setExtractions] = useState<ExtractionDto[]>([]);
  const [extractionsToAdd, setExtractionsToAdd] = useState<ExtractionDto[]>([]);
  const {importExtractions} = useExtractionState();

  const extractionToReadableString = useCallback(
    (extraction: ExtractionDto) => {
      let payload = '';
      payload += `#${extraction.index}`;
      payload += ` ${extraction.name}`;
      payload += ' (';

      const extractors: string[] = [];
      for (const extractor of extraction.extractors) {
        extractors.push(extractor.impl);
      }

      payload += extractors.join(', ');
      payload += ')';

      return payload;
    },
    [],
  );

  const checkboxProps: CheckboxProps = {
    disabled: false,
    inline: false,
  };

  const addExtraction = useCallback((extraction: ExtractionDto) => {
    setExtractionsToAdd((prev) => [...prev, extraction]);
  }, []);

  const removeExtraction = useCallback((extraction: ExtractionDto) => {
    setExtractionsToAdd((prev) =>
      prev.filter((ex) => ex.index !== extraction.index),
    );
  }, []);

  const close = () => {
    setIsOpen(false);
    setExtractionsToAdd([]);
    setExtractions([]);
  };

  const handleSubmit = useCallback(() => {
    importExtractions(extractionsToAdd);
    close();
  }, [extractionsToAdd, importExtractions]);

  const handleFileInputChange = async (e: FormEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;

    if (files === null) {
      notify('No files selected', 'danger');
      return;
    }

    const file = files[0];

    if (file.type !== JSON_TYPE) {
      notify('File type not supported', 'danger');
      return;
    }

    const json = await read(file);
    const dto = ConfigDto.parse(json);
    setExtractions(dto.extractions);
  };

  return (
    <>
      <Button
        className="flex grow"
        onClick={() => setIsOpen(true)}
        intent={Intent.WARNING}
      >
        Import
      </Button>

      <Dialog
        title="Import extractors"
        icon="info-sign"
        isOpen={isOpen}
        className={clsx(isDark && Classes.DARK)}
      >
        <DialogBody className={styles.dialogBody}>
          <FileInput
            text="Provide existing JSON configuration..."
            onInputChange={handleFileInputChange}
          />

          <div>
            {extractions.map((extraction) => {
              return (
                <Checkbox
                  {...checkboxProps}
                  key={extraction.index}
                  label={extractionToReadableString(extraction)}
                  onChange={(e) => {
                    if (!e.currentTarget.checked) {
                      removeExtraction(extraction);
                      return;
                    }

                    addExtraction(extraction);
                  }}
                />
              );
            })}
          </div>
        </DialogBody>

        <DialogFooter
          actions={
            <>
              <Button
                text="Close"
                onClick={() => setIsOpen(false)}
              />
              <Button
                intent="primary"
                text="Import"
                disabled={extractionsToAdd.length === 0}
                onClick={handleSubmit}
              />
            </>
          }
        />
      </Dialog>
    </>
  );
}
