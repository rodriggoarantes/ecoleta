import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Feather as Icon } from '@expo/vector-icons';
import {
  Logo,
  Title,
  Description,
  Container,
  Button,
  BtnIcon,
  BtnText,
  Main,
} from './styles';

import content from './content';

export default function Home() {
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate('Points');
  };

  return (
    <Container>
      <Main>
        <Logo />
        <Title>{content.title}</Title>
        <Description>{content.description}</Description>
      </Main>
      <Button onPress={handleNavigate}>
        <BtnIcon>
          <Icon name="arrow-right" color="#FFF" size={20} />
        </BtnIcon>
        <BtnText>Entrar</BtnText>
      </Button>
    </Container>
  );
}
