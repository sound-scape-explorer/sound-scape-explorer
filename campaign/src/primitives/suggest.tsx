import {type Intent, MenuItem, type MenuItemProps} from '@blueprintjs/core';
import {
  type ItemPredicate,
  type ItemRenderer,
  type ItemRendererProps,
  Suggest as BSuggest,
} from '@blueprintjs/select';
import {useCallback} from 'react';

interface Props {
  items: string[];
  selected: string;
  onChange: (value: string) => void;
  intent: Intent;
  disabled?: boolean;
}

function getItemProps(
  item: string,
  {handleClick, handleFocus, modifiers, ref}: ItemRendererProps,
): MenuItemProps & React.Attributes {
  return {
    active: modifiers.active,
    disabled: modifiers.disabled,
    onClick: handleClick,
    onFocus: handleFocus,
    ref,
    text: item,
  };
}

const noResults = (
  <MenuItem
    disabled={true}
    text="No results."
    roleStructure="listoption"
  />
);

export function Suggest({
  items,
  selected,
  onChange,
  intent,
  disabled = false,
}: Props) {
  const renderItem: ItemRenderer<string> = useCallback(
    (item, rendererProps) => {
      if (!rendererProps.modifiers.matchesPredicate) {
        return null;
      }

      return (
        <MenuItem
          {...getItemProps(item, rendererProps)}
          key={item}
          roleStructure="listoption"
          selected={item === selected}
        />
      );
    },
    [selected],
  );

  const filter: ItemPredicate<string> = useCallback(
    (query: string, item: string, _index, exactMatch) => {
      const normalizedItem = item.toLowerCase();
      const normalizedQuery = query.toLowerCase();

      if (exactMatch) {
        return normalizedItem === normalizedQuery;
      } else {
        return normalizedItem.indexOf(normalizedQuery) >= 0;
      }
    },
    [],
  );

  return (
    <BSuggest
      disabled={disabled}
      items={items}
      closeOnSelect
      selectedItem={selected}
      inputValueRenderer={(item) => item}
      itemPredicate={filter}
      itemRenderer={renderItem}
      onItemSelect={onChange}
      inputProps={{intent}}
      noResults={noResults}
      popoverProps={{minimal: true, matchTargetWidth: true}}
    />
  );
}
