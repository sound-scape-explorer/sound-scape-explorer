import {Bands} from 'src/components/settings/bands/bands.tsx';
import styles from 'src/components/settings/config.module.scss';
import {Extractors} from 'src/components/settings/extractors/extractors.tsx';
import {Integrations} from 'src/components/settings/integrations/integrations.tsx';
import {useSettings} from 'src/hooks/use-settings.ts';

export function ConfigPage() {
  const {hasSettings} = useSettings();

  return (
    <div className={styles.container}>
      <div>
        Please configure at least one band, one integration and one extractor
        &nbsp;
        <span>{hasSettings ? '✅' : '❌'}</span>
      </div>

      <Bands />
      <Integrations />
      <Extractors />
    </div>
  );
}
