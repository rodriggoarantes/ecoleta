import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Centered } from './styles';

const Loading = () => {
  return (
    <>
      <Centered>
        <ActivityIndicator size="large" color="#34cb79" />
      </Centered>
    </>
  );
};

export default Loading;
