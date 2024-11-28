import styles from 'src/components/pages/export.page.module.scss';
import {useExportPage} from 'src/components/pages/hooks/use-export-page.ts';

export function ExportPage() {
  const {download} = useExportPage();

  return (
    <div className={styles.container}>
      <div>Export your campaign project to JSON</div>
      <button
        className={styles.button}
        onClick={download}
      >
        <span>Download</span>
      </button>
    </div>
  );
}
