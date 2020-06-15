import React from 'react';
import { Image } from 'react-native';
import { Hello } from './styles';

import logo from '../../assets/logo.png';

export default function Main() {
  return (
    <>
      <Image source={logo} />
      <Hello>HELLO APP BLANK</Hello>
    </>
  );
}
