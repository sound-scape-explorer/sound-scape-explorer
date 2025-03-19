import {Callout} from '@blueprintjs/core';
import {JSX} from 'react';

export interface DrawerContentProps {
  content: [string | JSX.Element | null, string | JSX.Element][];
}

export function DrawerContent({content}: DrawerContentProps) {
  return (
    <div className="flex column gap mt">
      {content.map(([title, body], i) => {
        if (typeof title === 'string') {
          return (
            <Callout
              key={i}
              compact
              title={title}
            >
              {body}
            </Callout>
          );
        }

        return (
          <Callout
            key={i}
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
