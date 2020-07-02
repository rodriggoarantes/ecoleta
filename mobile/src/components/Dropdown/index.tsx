import React from 'react';
import { StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Item from '../../models/Item';

export interface Props {
  items: Array<Item>;
  setValue: Function;
  value: any;
  placeholder?: string;
}

const Dropdown: React.FC<Props> = (props) => {
  return (
    <RNPickerSelect
      onValueChange={(value) => props.setValue(value)}
      items={props.items}
      style={pickerSelectStyles}
      value={props.value}
      useNativeAndroidPickerStyle={false}
      placeholder={{
        ...placeholder,
        label: props.placeholder || placeholder.label,
      }}
    />
  );
};

const placeholder = {
  label: 'Select ...',
  value: null,
  color: '#9EA0A4',
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 60,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 20,
    borderColor: 'white',
    color: 'gray',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  inputAndroid: {
    height: 60,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
    borderColor: 'white',
    color: 'gray',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 4,
  },
});

export default Dropdown;
