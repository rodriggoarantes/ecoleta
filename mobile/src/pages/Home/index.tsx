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
import Item from '../../models/Item';

import api from '../../services/api';

const Home = () => {
  const [cities, setCities] = useState<Item[]>([]);
  const [states, setStates] = useState<Item[]>([]);
  const [selectedCity, setSelectedCity] = useState<Item>({} as Item);
  const [selectedState, setSelectedState] = useState<Item>({} as Item);
  const navigation = useNavigation();

  const handleNavigate = () => {
    navigation.navigate('Points', { state: selectedState, city: selectedCity });
  };

  const handleSelectedState = (value: number) => {
    setCities([]);
    setSelectedCity({ value: null } as Item);

    if (value) {
      setSelectedState(
        states.find((item: Item) => item.value === value) || ({} as Item)
      );
    }
  };

  const handleSelectedCity = (value: number) => {
    if (value) {
      setSelectedCity(
        cities.find((item: Item) => item.value === value) || ({} as Item)
      );
    }
  };

  useEffect(() => {
    api.get(`states`).then((response) => {
      const stateItems = response.data.map(
        (state: any) => ({ label: state.uf, value: state.id } as Item)
      );
      setStates(stateItems);
    });
  }, []);

  useEffect(() => {
    api.get(`/cities/states/${selectedState.value}`).then((response) => {
      const citiesItems = response.data.map(
        (city: any) => ({ label: city.name, value: city.id } as Item)
      );
      setCities(citiesItems);
    });
  }, [selectedState]);

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
          value={selectedState.value}
          setValue={handleSelectedState}
        />
        <Dropdown
          placeholder="Selecione uma cidade"
          items={cities}
          value={selectedCity.value}
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
