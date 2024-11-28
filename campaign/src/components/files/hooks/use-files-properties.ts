import {useAtom} from 'jotai';
import {useCallback, useRef} from 'react';
import {audioFilesColumnsAtom, audioFilesPropertiesAtom} from 'src/atoms.ts';
import {BASE_WIDTH, LABEL_PREFIX} from 'src/constants.ts';
import {notifyError} from 'src/utils/notify-error.ts';

export function useFilesProperties() {
  const propertyNewRef = useRef<HTMLInputElement | null>(null);
  const propertySelectRef = useRef<HTMLSelectElement | null>(null);
  const propertyEditRef = useRef<HTMLInputElement | null>(null);
  const [columns, setColumns] = useAtom(audioFilesColumnsAtom);
  const [properties, setProperties] = useAtom(audioFilesPropertiesAtom);

  const resetPropertyNew = useCallback(() => {
    if (propertyNewRef.current === null) {
      return;
    }

    propertyNewRef.current.value = '';
  }, [propertyNewRef]);

  const resetPropertyEdit = useCallback(() => {
    if (propertyEditRef.current === null) {
      return;
    }

    propertyEditRef.current.value = '';
  }, [propertyEditRef]);

  const notifyExistingProperty = useCallback(() => {
    notifyError('Property already exists');
  }, []);

  const addProperty = useCallback(() => {
    if (
      propertyNewRef.current === null ||
      propertyNewRef.current.value === ''
    ) {
      return;
    }

    const newProperty = propertyNewRef.current.value.toUpperCase();

    if (properties.includes(newProperty)) {
      notifyExistingProperty();
      resetPropertyNew();
      return;
    }

    const newProperties = [...properties, newProperty];
    setProperties(newProperties);

    const newPropertyWithPrefix = `${LABEL_PREFIX}${newProperty}`;

    const newColumns = [
      ...columns,
      {
        field: newPropertyWithPrefix,
        minWidth: BASE_WIDTH * 2,
        editable: true,
      },
    ];

    setColumns(newColumns);

    resetPropertyNew();
  }, [
    columns,
    setColumns,
    properties,
    setProperties,
    resetPropertyNew,
    notifyExistingProperty,
  ]);

  const renameProperty = useCallback(() => {
    if (
      propertySelectRef.current === null ||
      propertyEditRef.current === null ||
      propertyEditRef.current.value === ''
    ) {
      return;
    }

    const selectedProperty = propertySelectRef.current.value.toUpperCase();
    const renamedProperty = propertyEditRef.current.value.toUpperCase();

    if (properties.includes(renamedProperty)) {
      notifyExistingProperty();
      resetPropertyEdit();
      return;
    }

    const newProperties = [...properties];
    const newPropertyIndex = newProperties.findIndex(
      (p) => p === selectedProperty,
    );
    newProperties[newPropertyIndex] = renamedProperty;
    setProperties(newProperties);

    const newColumns = [...columns];
    const selectedPropertyWithPrefix = `${LABEL_PREFIX}${selectedProperty}`;
    const renamedPropertyWithPrefix = `${LABEL_PREFIX}${renamedProperty}`;
    const newColumnIndex = newColumns.findIndex(
      (c) => c.field === selectedPropertyWithPrefix,
    );
    newColumns[newColumnIndex].field = renamedPropertyWithPrefix;
    setColumns(newColumns);

    resetPropertyEdit();
  }, [
    propertySelectRef,
    propertyEditRef,
    notifyExistingProperty,
    resetPropertyEdit,
    properties,
    setProperties,
    columns,
    setColumns,
  ]);

  const removeProperty = useCallback(() => {
    if (propertySelectRef.current === null) {
      return;
    }

    const propertyToRemove = propertySelectRef.current.value.toUpperCase();
    const newProperties = properties.filter((p) => p !== propertyToRemove);
    setProperties(newProperties);

    const propertyToRemoveWithPrefix = `${LABEL_PREFIX}${propertyToRemove}`;
    const newColumns = columns.filter(
      (c) => c.field !== propertyToRemoveWithPrefix,
    );
    setColumns(newColumns);

    resetPropertyEdit();
  }, [
    propertySelectRef,
    properties,
    setProperties,
    columns,
    setColumns,
    resetPropertyEdit,
  ]);

  return {
    properties,
    propertyNewRef,
    propertySelectRef,
    propertyEditRef,
    addProperty,
    renameProperty,
    removeProperty,
  };
}
