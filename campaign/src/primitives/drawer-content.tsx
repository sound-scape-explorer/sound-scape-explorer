import {Callout} from '@blueprintjs/core';
import {JSX, useEffect} from 'react';
import {useNotify} from 'src/hooks/use-notify.ts';

interface Props {
  items: {
    index: number;
    title: string | JSX.Element | null;
    body: string | JSX.Element;
  }[];
}

export function DrawerContent({items}: Props) {
  const {notify} = useNotify();

  useEffect(() => {
    const indices = items.map((item) => item.index);
    const hasDuplicates = new Set(indices).size !== indices.length;

    if (hasDuplicates) {
      const msg =
        'DrawerContent items must have unique indices. Expect render issues.';
      console.error(msg);
      notify(msg, 'danger');
    }
  }, [items, notify]);

  return (
    <div className="flex column gap mt scrollable">
      {items.map(({index, title, body}) => {
        if (typeof title === 'string') {
          return (
            <Callout
              key={index}
              compact
              title={title}
            >
              {body}
            </Callout>
          );
        }

        return (
          <Callout
            key={index}
            compact
          >
            {title !== null && title}
            {body}
          </Callout>
        );
      })}
    </div>
  );
}
