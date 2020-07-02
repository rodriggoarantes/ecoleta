import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Back, Icon } from './styles';

const BackButton = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <Back onPress={handleBack}>
        <Icon />
      </Back>
    </>
  );
};

export default BackButton;
