import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';
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
import Loading from '../../components/Loading';

import api from '../../services/api';

interface Data {
  point: {
    image: string;
    name: string;
    email: string;
    whatsapp: string;
    city: {
      name: string;
    };
    state: {
      uf: string;
    };
  };
  items: {
    title: string;
  }[];
}
interface RouteParam {
  point_id: number;
}

const Detail = () => {
  const [data, setData] = useState<Data>({} as Data);

  const route = useRoute();
  const routeParams: RouteParam = route.params as RouteParam;

  useEffect(() => {
    api
      .get(`points/${routeParams.point_id}`)
      .then((response) => setData(response.data));
  }, []);

  const handleComposeMail = () => {
    MailComposer.composeAsync({
      subject: 'Interesse na coleta',
      recipients: [data.point.email],
    });
  };

  const handleWhatsapp = () => {
    Linking.openURL(
      `whatsapp://send?phone=${data.point.whatsapp}&text=Interesse em coleta`
    );
  };

  if (!data || !data.point) {
    return <Loading />;
  }

  return (
    <>
      <Container>
        <BackButton />
        <PointImage source={{ uri: data.point.image }} />

        <PointName>{data.point.name}</PointName>
        <PointItems>
          {data.items.map((item) => item.title).join(', ')}
        </PointItems>

        <Address>
          <AddressTitle>Endereço</AddressTitle>
          <AddressContent>
            {data.point.city.name}, {data.point.state.uf}
          </AddressContent>
        </Address>
      </Container>

      <Footer>
        <Button onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={20} color="#FFF" />
          <BtnText>Whatsapp</BtnText>
        </Button>

        <Button onPress={handleComposeMail}>
          <Feather name="mail" size={20} color="#FFF" />
          <BtnText>E-mail</BtnText>
        </Button>
      </Footer>
    </>
  );
};

export default Detail;
