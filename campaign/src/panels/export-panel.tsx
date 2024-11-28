import {useExportPanel} from 'src/hooks/use-export-panel.ts';
import styles from 'src/panels/export-panel.module.scss';

export function ExportPanel() {
  const {download} = useExportPanel();

  return (
    <div className={styles.container}>
      <div>Export your campaign project to JSON</div>
      <div>
        Import it into the <span className={styles.italic}>Processing</span>{' '}
        module to generate your data
      </div>
      <button
        className={styles.button}
        onClick={download}
      >
        <span>Download campaign JSON</span>
      </button>
    </div>
  );
}
