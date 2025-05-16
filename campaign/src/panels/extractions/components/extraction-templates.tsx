import {type ExtractionConfig} from 'src/interfaces.ts';
import {
  TemplateKey,
  useExtractionTemplates,
} from 'src/panels/extractions/hooks/use-extraction-templates.ts';
import {Select} from 'src/primitives/select.tsx';

interface Props {
  extraction: ExtractionConfig;
}

export function ExtractionTemplates({extraction}: Props) {
  const {key, update} = useExtractionTemplates(extraction);

  return (
    <Select<TemplateKey>
      items={Object.values(TemplateKey)}
      current={key}
      onSelect={(k) => update(k)}
    />
  );
}
