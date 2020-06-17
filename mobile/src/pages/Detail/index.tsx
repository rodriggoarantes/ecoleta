import React from 'react';
import { FontAwesome, Feather } from '@expo/vector-icons';
import {
  Container,
  PointImage,
  PointName,
  PointItems,
  Address,
  AddressTitle,
  AddressContent,
  Footer,
  Button,
  BtnText,
} from './styles';

import BackButton from '../../components/BackButton';

const Detail = () => {
  return (
    <>
      <Container>
        <BackButton />

        <PointImage
          source={{
            uri:
              'https://www.mercadoeconsumo.com.br/wp-content/uploads/2018/07/Carrefour-inaugura-unidade-Market-na-Praia-Grande.jpg',
          }}
        />

        <PointName>Mercadao do Rodrigo</PointName>
        <PointItems>Lampadas, Oleo, Etc</PointItems>

        <Address>
          <AddressTitle>Endereço</AddressTitle>
          <AddressContent>Aparecida de Goiania, GO</AddressContent>
        </Address>
      </Container>

      <Footer>
        <Button>
          <FontAwesome name="whatsapp" size={20} color="#FFF" />
          <BtnText>Whatsapp</BtnText>
        </Button>

        <Button>
          <Feather name="mail" size={20} color="#FFF" />
          <BtnText>E-mail</BtnText>
        </Button>
      </Footer>
    </>
  );
};

export default Detail;
