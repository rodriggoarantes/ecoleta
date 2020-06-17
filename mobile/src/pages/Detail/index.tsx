import React from 'react';
import { Container, PointImage, PointName, PointItems } from './styles';

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
      </Container>
    </>
  );
};

export default Detail;
