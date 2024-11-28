import {MenuItem, type MenuItemProps} from '@blueprintjs/core';
import {
  type ItemRenderer,
  type ItemRendererProps,
  MultiSelect,
} from '@blueprintjs/select';
import {Attributes, useCallback} from 'react';

interface I {
  index: number;
}

function getItemProps<T extends I>(
  item: T,
  {handleClick, handleFocus, modifiers, ref}: ItemRendererProps,
  tagSelector: keyof T,
): MenuItemProps & Attributes {
  return {
    active: modifiers.active,
    disabled: modifiers.disabled,
    key: item.index,
    onClick: handleClick,
    onFocus: handleFocus,
    ref,
    text: <>{item[tagSelector]}</>,
  };
}

interface Props<T> {
  items: T[];
  selected: T[];
  tagSelector: keyof T;
  renderTag: (item: T) => string;
  onSelect: (items: T[]) => void;
  onClear: () => void;
  onRemove: (index: number) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function MultipleSelect<T extends I>({
  items,
  selected,
  tagSelector,
  renderTag,
  onSelect,
  onClear,
  onRemove,
  placeholder = '',
  disabled = false,
}: Props<T>) {
  const selectItem = useCallback(
    (item: T) => {
      if (selected.includes(item)) {
        return;
      }

      onSelect([...selected, item]);
    },
    [selected, onSelect],
  );

  const renderItem: ItemRenderer<T> = useCallback(
    (item, rendererProps) => {
      if (!rendererProps.modifiers.matchesPredicate) {
        return null;
      }

      return (
        <MenuItem
          {...getItemProps<T>(item, rendererProps, tagSelector)}
          roleStructure="listoption"
          selected={selected.includes(item)}
          shouldDismissPopover={false}
          text={<>{item[tagSelector]}</>}
        />
      );
    },
    [selected, tagSelector],
  );

  return (
    <MultiSelect
      fill
      selectedItems={selected}
      tagRenderer={renderTag}
      items={items}
      itemRenderer={renderItem}
      onItemSelect={selectItem}
      placeholder={placeholder}
      onClear={onClear}
      disabled={items.length === 0 || disabled}
      popoverProps={{minimal: true}}
      tagInputProps={{
        onRemove: (_, i) => onRemove(i),
      }}
    />
  );
}
