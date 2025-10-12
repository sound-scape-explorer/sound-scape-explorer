import {HTMLTable} from '@blueprintjs/core';
import {Fragment, JSX} from 'react';
import {DrawerContent} from 'src/primitives/drawer-content.tsx';

import styles from './files-date-detection-drawer-contenet.module.scss';

const Red = ({children}: {children: string}) => (
  <b className={styles.red}>{children}</b>
);

const examples: [JSX.Element | string, JSX.Element][] = [
  [
    <span key="path-1">
      /data/
      <b>
        20221122<Red>T</Red>122000
      </b>
      _2614231302179085_2.0.wav
    </span>,
    <span key="template-1">
      yyyyMMdd<Red>&#39;T&#39;</Red>HHmmss
    </span>,
  ],
  [
    <span key="path-2">
      /
      <b>
        20220518<Red>_</Red>213000
      </b>
      .WAV
    </span>,
    <span key="template-2">
      yyyyMMdd<Red>&#39;_&#39;</Red>HHmmss
    </span>,
  ],
];

export function FilesDateDetectionDrawerContent() {
  return (
    <DrawerContent
      content={[
        [
          'How to',
          <div
            key="how-to"
            className="flex column"
          >
            <span>
              The detection template follows the string patterns from{' '}
              <code>date-fns</code>.
            </span>
            <span>
              Documentation is available{' '}
              <a
                href="https://date-fns.org/v4.1.0/docs/parse"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
              .
            </span>
            <span>
              Encapsulate characters with single quotes to bypass them from
              detection pattern.
            </span>
          </div>,
        ],
        [
          'Examples',
          <div
            key="examples"
            className="flex gap column"
          >
            <div>
              Pay attention to <code>&#39;characters_to_skip&#39;</code> in{' '}
              <Red>red</Red>.
            </div>

            {examples.map((example, index) => (
              <Fragment key={index}>
                <h2>Example {index + 1}</h2>
                <HTMLTable
                  bordered
                  striped
                  compact
                  className={styles.table}
                >
                  <tbody>
                    <tr>
                      <td className={styles.short}>path</td>
                      <td className={styles.long}>{example[0]}</td>
                    </tr>
                    <tr>
                      <td className={styles.short}>template</td>
                      <td className={styles.long}>{example[1]}</td>
                    </tr>
                  </tbody>
                </HTMLTable>
              </Fragment>
            ))}
          </div>,
        ],
      ]}
    />
  );
}
