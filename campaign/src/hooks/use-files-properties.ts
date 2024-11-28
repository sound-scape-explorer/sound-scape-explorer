import {useAtom} from 'jotai';
import {type ChangeEvent, useCallback, useState} from 'react';
import {gridColumnsAtom, labelPropertiesAtom} from 'src/atoms.ts';
import {BASE_WIDTH} from 'src/constants.ts';
import {useFilesPage} from 'src/hooks/use-files-page.ts';
import {type LabelProperty} from 'src/types.ts';
import {addPrefixToLabelProperty} from 'src/utils/files.ts';
import {notifyError} from 'src/utils/notifications.ts';

export function useFilesProperties() {
  const [properties, setProperties] = useAtom(labelPropertiesAtom);
  const [newProperty, setNewProperty] = useState<string>('');
  const [editProperty, setEditProperty] = useState<string>('');
  const [selectedProperty, setSelectedProperty] =
    useState<LabelProperty | null>(null);

  const [columns, setColumns] = useAtom(gridColumnsAtom);
  const {renameRows} = useFilesPage();

  const resetNewProperty = useCallback(() => {
    if (newProperty === '') {
      return;
    }

    setNewProperty('');
  }, [newProperty, setNewProperty]);

  const handleNewPropertyChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setNewProperty(e.target.value);
    },
    [],
  );

  const resetPropertyEdit = useCallback(() => {
    if (editProperty === '') {
      return;
    }

    setEditProperty('');
  }, [editProperty]);

  const handleEditPropertyChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEditProperty(e.target.value);
    },
    [],
  );

  const notifyExistingProperty = useCallback(() => {
    notifyError('Property already exists');
  }, []);

  const addProperty = useCallback(
    (propertyOverload?: string) => {
      let addedProperty: string | null = null;

      // TODO: the fuck is this, document me
      if (typeof propertyOverload === 'string') {
        addedProperty = propertyOverload;
      } else {
        if (newProperty === '') {
          return;
        }

        addedProperty = newProperty.toUpperCase();
      }

      const names = properties.map((p) => p.name);

      if (names.includes(addedProperty)) {
        notifyExistingProperty();
        resetNewProperty();
        return;
      }

      const appendedProperties: LabelProperty[] = [
        ...properties,
        {name: addedProperty},
      ];

      setProperties(appendedProperties);

      const addedPropertyWithPrefix = addPrefixToLabelProperty(addedProperty);

      const appendedColumns = [
        ...columns,
        {
          field: addedPropertyWithPrefix,
          minWidth: BASE_WIDTH * 2,
          editable: true,
        },
      ];

      setColumns(appendedColumns);
      resetNewProperty();
    },
    [
      newProperty,
      columns,
      setColumns,
      properties,
      setProperties,
      resetNewProperty,
      notifyExistingProperty,
    ],
  );

  const renameProperties = useCallback(
    (oldName: string, newName: string) => {
      const newProperties = [...properties];
      const newPropertyIndex = newProperties.findIndex(
        (p) => p.name === oldName,
      );

      newProperties[newPropertyIndex].name = newName;
      setProperties(newProperties);
    },
    [properties, setProperties],
  );

  const renameColumns = useCallback(
    (currentProperty: string, renamedProperty: string) => {
      const newColumns = [...columns];
      const currentPropertyWithPrefix =
        addPrefixToLabelProperty(currentProperty);
      const renamedPropertyWithPrefix =
        addPrefixToLabelProperty(renamedProperty);

      const newColumnIndex = newColumns.findIndex(
        (c) => c.field === currentPropertyWithPrefix,
      );

      newColumns[newColumnIndex].field = renamedPropertyWithPrefix;
      setColumns(newColumns);
    },
    [columns, setColumns],
  );

  const renameProperty = useCallback(() => {
    if (selectedProperty === null || editProperty === '') {
      return;
    }

    const oldName = selectedProperty.name.toUpperCase();
    const newName = editProperty.toUpperCase();
    const names = properties.map((p) => p.name);

    if (names.includes(newName)) {
      notifyExistingProperty();
      return;
    }

    renameProperties(oldName, newName);
    renameColumns(oldName, newName);
    renameRows(oldName, newName);
    resetPropertyEdit();
  }, [
    properties,
    editProperty,
    selectedProperty,
    notifyExistingProperty,
    renameProperties,
    renameColumns,
    renameRows,
    resetPropertyEdit,
  ]);

  const removeProperty = useCallback(() => {
    if (selectedProperty === null) {
      return;
    }

    const nameToRemove = selectedProperty.name.toUpperCase();
    const newProperties = properties.filter((p) => p.name !== nameToRemove);
    setProperties(newProperties);

    const propertyToRemoveWithPrefix = addPrefixToLabelProperty(nameToRemove);

    const newColumns = columns.filter(
      (c) => c.field !== propertyToRemoveWithPrefix,
    );
    setColumns(newColumns);
    resetPropertyEdit();
    setSelectedProperty(null);
  }, [
    selectedProperty,
    properties,
    setProperties,
    columns,
    setColumns,
    resetPropertyEdit,
  ]);

  return {
    properties,
    newProperty,
    handleNewPropertyChange,
    editProperty,
    handleEditPropertyChange,
    selectedProperty,
    setSelectedProperty,
    addProperty,
    renameProperty,
    removeProperty,
  };
}
