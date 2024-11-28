import {Button, Section} from '@blueprintjs/core';
import {SectionCard} from '@blueprintjs/core/lib/esnext';
import {Add, ArrowDown, ArrowUp, Cross} from '@blueprintjs/icons';
import clsx from 'clsx';
import {JSX, useState} from 'react';
import {ICON_SIZE} from 'src/constants.ts';
import {type GenericSectionStateUpdate} from 'src/primitives/generic-section/use-generic-section-state.ts';
import {type Validation} from 'src/primitives/generic-section/use-generic-section-validation.ts';
import {SmallCallout} from 'src/primitives/small-callout.tsx';

import styles from './generic-section.module.scss';

interface I {
  index: number;
}

interface Props<T extends I> {
  title: string;
  getSlug: (item: T) => string;
  items: T[];
  add: () => void;
  update: GenericSectionStateUpdate<T>;
  className: string;
  validation?: Validation;
  renderItem: (item: T) => JSX.Element;
  children: JSX.Element | JSX.Element[];
  disabled?: boolean;
}

export function GenericSection<T extends I>({
  title,
  getSlug,
  items,
  add,
  update,
  className,
  validation,
  renderItem,
  children,
  disabled = false,
}: Props<T>) {
  const [open, setOpen] = useState(false);

  return (
    <Section
      title={title}
      compact
      collapsible
      collapseProps={{
        isOpen: open,
        onToggle: () => setOpen((o) => !o),
      }}
      rightElement={
        validation && (
          <SmallCallout intent={validation.intent}>
            {validation.content}
          </SmallCallout>
        )
      }
    >
      <SectionCard className={clsx(styles.row, styles.narrow, className)}>
        <div>
          <Button
            size="small"
            icon={<Add size={ICON_SIZE} />}
            fill
            style={{margin: 2}}
            onClick={add}
            disabled={disabled}
          />
        </div>
        <div>idx</div>
        {children}
      </SectionCard>

      {items
        .sort((a, b) => a.index - b.index)
        .map((item) => (
          <SectionCard
            key={getSlug(item)}
            className={clsx(styles.row, className)}
          >
            <div className="flex gap">
              <Button
                size="small"
                icon={<Cross size={ICON_SIZE} />}
                onClick={() => update(item, 'delete')}
                disabled={disabled}
              />
              <Button
                size="small"
                icon={<ArrowDown size={ICON_SIZE} />}
                onClick={() => update(item, 'index', +1)}
                disabled={disabled}
              />
              <Button
                size="small"
                icon={<ArrowUp size={ICON_SIZE} />}
                onClick={() => update(item, 'index', -1)}
                disabled={disabled}
              />
            </div>

            <span>{item.index}</span>

            {renderItem(item)}
          </SectionCard>
        ))}
    </Section>
  );
}
