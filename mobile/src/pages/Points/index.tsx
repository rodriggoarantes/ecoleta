import React from 'react';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';

import BackButton from '../../components/BackButton';

import {
  Container,
  Title,
  Description,
  MapContainer,
  MapView,
  MapMarker,
  MapMarkerContainer,
  MapMarkerImage,
  MapMarkerTitle,
  ItemsContainer,
  Item,
  ItemTitle,
} from './styles';

import content from './content';

const Points: React.FC = () => {
  const navigation = useNavigation();
  const handleNavigateDetail = () => {
    navigation.navigate('Detail');
  };

  return (
    <>
      <Container>
        <BackButton />
        <Title>{content.title}</Title>
        <Description>{content.description}</Description>

        <MapContainer>
          <MapView
            initialRegion={{
              latitude: -16.7411712,
              longitude: -49.2633359,
              latitudeDelta: 0.014,
              longitudeDelta: 0.014,
            }}
          >
            <MapMarker
              coordinate={{ latitude: -16.7411712, longitude: -49.2633359 }}
              onPress={handleNavigateDetail}
            >
              <MapMarkerContainer>
                <MapMarkerImage
                  source={{
                    uri:
                      'https://www.mercadoeconsumo.com.br/wp-content/uploads/2018/07/Carrefour-inaugura-unidade-Market-na-Praia-Grande.jpg',
                  }}
                />
                <MapMarkerTitle>Mercado</MapMarkerTitle>
              </MapMarkerContainer>
            </MapMarker>
          </MapView>
        </MapContainer>
      </Container>
      <ItemsContainer>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          <Item onPress={() => {}}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.0.102:3333/uploads/lampadas.svg"
            />
            <ItemTitle>Nome Item</ItemTitle>
          </Item>
          <Item onPress={() => {}}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.0.102:3333/uploads/lampadas.svg"
            />
            <ItemTitle>Nome Item</ItemTitle>
          </Item>
          <Item onPress={() => {}}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.0.102:3333/uploads/lampadas.svg"
            />
            <ItemTitle>Nome Item</ItemTitle>
          </Item>
          <Item onPress={() => {}}>
            <SvgUri
              width={42}
              height={42}
              uri="http://192.168.0.102:3333/uploads/lampadas.svg"
            />
            <ItemTitle>Nome Item</ItemTitle>
          </Item>
        </ScrollView>
      </ItemsContainer>
    </>
  );
};

export default Points;
