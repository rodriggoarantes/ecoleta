import React, { useState, useEffect } from 'react';
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
  Footer,
} from './styles';

import content from './content';

import Dropdown from '../../components/Dropdown';
import DropdownItem from '../../components/Dropdown/Item';

import api from '../../services/api';

const Home = () => {
  const [cities, setCities] = useState<DropdownItem[]>([]);
  const [states, setStates] = useState<DropdownItem[]>([]);
  const [selectedCity, setSelectedCity] = useState<DropdownItem>(
    {} as DropdownItem
  );
  const [selectedState, setSelectedState] = useState<DropdownItem>(
    {} as DropdownItem
  );
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate('Points');
  };

  const handleSelectedState = (id: number) => {
    console.log(`state: ${id}`);
  };

  const handleSelectedCity = (id: number) => {
    console.log(`city: ${id}`);
  };

  useEffect(() => {
    api.get(`states`).then((response) => {
      const stateItems = response.data.map(
        (state: any) => ({ label: state.uf, value: state.id } as DropdownItem)
      );
      setStates(stateItems);
    });
  }, []);

  return (
    <Container>
      <Main>
        <Logo />
        <Title>{content.title}</Title>
        <Description>{content.description}</Description>
      </Main>
      <Footer>
        <Dropdown
          placeholder="Selecione um estado"
          items={states}
          setValue={handleSelectedState}
        />
        <Dropdown
          placeholder="Selecione uma cidade"
          items={cities}
          setValue={handleSelectedCity}
        />
        <Button onPress={handleNavigate}>
          <BtnIcon>
            <Icon name="arrow-right" color="#FFF" size={20} />
          </BtnIcon>
          <BtnText>Entrar</BtnText>
        </Button>
      </Footer>
    </Container>
  );
};

export default Home;
