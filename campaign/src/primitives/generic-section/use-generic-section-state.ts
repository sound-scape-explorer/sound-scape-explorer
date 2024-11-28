import {type PrimitiveAtom, useAtom} from 'jotai';
import {useCallback} from 'react';

interface WithInitialValue<Value> {
  init: Value;
}

interface I {
  index: number;
}

type GenericAtom<T extends I> = PrimitiveAtom<T[]> & WithInitialValue<T[]>;

export type GenericSectionStateUpdate<T extends I> = <K extends keyof T>(
  o: T,
  key: K | 'delete',
  value?: T[K],
) => void;

interface Props<T extends I> {
  atom: GenericAtom<T>;
  createItem: (index: number) => T;
  onDelete?: (item: T) => void;
}

export function useGenericSectionState<T extends I>({
  atom,
  createItem,
  onDelete,
}: Props<T>) {
  const [items, setItems] = useAtom<T[]>(atom);

  const add = useCallback(() => {
    const item = createItem(items.length);
    setItems([...items, item]);
  }, [items, setItems, createItem]);

  const update = useCallback<GenericSectionStateUpdate<T>>(
    (item, key, value) => {
      let newItems = [...items];

      switch (key) {
        case 'delete': {
          newItems = newItems.filter((o) => o.index !== item.index);
          newItems.forEach((o, i) => (o.index = i));

          if (onDelete) {
            onDelete(item);
          }

          break;
        }
        case 'index': {
          const newIndex = item.index + Number(value);

          if (newIndex < 0 || newIndex >= items.length) {
            return;
          }

          const existing = newItems.find((o) => o.index === newIndex);
          const updated = newItems.find((o) => o.index === item.index);
          if (existing && updated) {
            existing.index = item.index;
            updated.index = newIndex;
          }

          break;
        }
        default: {
          const found = newItems.find((o) => o.index === item.index);
          if (found && typeof value !== 'undefined') {
            found[key] = value;
          }
        }
      }

      setItems(newItems);
    },
    [items, setItems, onDelete],
  );

  return {
    items,
    setItems,
    add,
    update,
  };
}
