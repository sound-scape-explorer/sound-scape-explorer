import {HTMLTable} from '@blueprintjs/core';
import {Fragment, JSX} from 'react';
import {DrawerContent} from 'src/primitives/drawer-content.tsx';

import styles from './files-date-detection-drawer-contenet.module.scss';

const Red = ({children}: {children: string}) => (
  <b className={styles.red}>{children}</b>
);

interface Example {
  index: number;
  path: JSX.Element;
  template: JSX.Element;
}

const examples: Example[] = [
  {
    index: 0,
    path: (
      <span>
        /data/
        <b>
          20221122<Red>T</Red>122000
        </b>
        _2614231302179085_2.0.wav
      </span>
    ),
    template: (
      <span>
        yyyyMMdd<Red>&#39;T&#39;</Red>HHmmss
      </span>
    ),
  },
  {
    index: 1,
    path: (
      <span>
        /
        <b>
          20220518<Red>_</Red>213000
        </b>
        .WAV
      </span>
    ),
    template: (
      <span>
        yyyyMMdd<Red>&#39;_&#39;</Red>HHmmss
      </span>
    ),
  },
];

export function FilesDateDetectionDrawerContent() {
  return (
    <DrawerContent
      items={[
        {
          index: 0,
          title: 'How to',
          body: (
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
            </div>
          ),
        },
        {
          index: 1,
          title: 'Examples',
          body: (
            <div
              key="examples"
              className="flex gap column"
            >
              <div>
                Pay attention to <code>&#39;characters_to_skip&#39;</code> in{' '}
                <Red>red</Red>.
              </div>

              {examples.map((example) => (
                <Fragment key={example.index}>
                  <h2>Example {example.index + 1}</h2>
                  <HTMLTable
                    bordered
                    striped
                    compact
                    className={styles.table}
                  >
                    <tbody>
                      <tr>
                        <td className={styles.short}>path</td>
                        <td className={styles.long}>{example.path}</td>
                      </tr>
                      <tr>
                        <td className={styles.short}>template</td>
                        <td className={styles.long}>{example.template}</td>
                      </tr>
                    </tbody>
                  </HTMLTable>
                </Fragment>
              ))}
            </div>
          ),
        },
      ]}
    />
  );
}
