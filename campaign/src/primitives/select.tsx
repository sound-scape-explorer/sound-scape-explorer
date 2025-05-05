import {Button, type Intent, MenuItem, Size} from '@blueprintjs/core';
import {type ItemRendererProps, Select as BSelect} from '@blueprintjs/select';
import {type Key, useCallback, useMemo} from 'react';

function renderItem<T>(
  item: T,
  {handleClick, handleFocus, modifiers}: ItemRendererProps,
  key: keyof T | null,
  selector: keyof T | null,
) {
  if (!modifiers.matchesPredicate) {
    return null;
  }

  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      key={key === null ? (item as Key) : (item[key] as Key)}
      onClick={handleClick}
      onFocus={handleFocus}
      text={`${selector === null ? item : item[selector]}`}
    />
  );
}

interface Props<T> {
  items: T[];
  current: T | null;
  onSelect: (item: T) => void;
  placeholder?: string;
  size?: Size;
  forwardKey?: keyof T | null;
  selector?: keyof T | null;
  disabled?: boolean;
  intent?: Intent;
}

export function Select<T>({
  items,
  current,
  onSelect,
  placeholder,
  size = Size.MEDIUM,
  forwardKey = null,
  selector = null,
  disabled = false,
  intent = 'none',
}: Props<T>) {
  const hasNoSelection = useMemo(() => current === null, [current]);

  const getText = useCallback(() => {
    if (hasNoSelection) {
      return placeholder;
    }

    if (selector === null) {
      return current as string;
    }

    if (current && selector) {
      return current[selector] as string;
    }

    return '';
  }, [current, placeholder, selector, hasNoSelection]);

  return (
    <BSelect<T>
      items={items}
      activeItem={current}
      itemRenderer={(...props) => renderItem(...props, forwardKey, selector)}
      onItemSelect={onSelect}
      filterable={false}
      popoverProps={{minimal: true}}
    >
      <Button
        fill
        size={size}
        alignText="left"
        text={getText()}
        endIcon="double-caret-vertical"
        disabled={disabled}
        intent={intent}
      />
    </BSelect>
  );
}
