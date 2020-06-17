import React, { useState, useEffect } from 'react';
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

import api from './../../services/api';
import content from './content';

interface Item {
  id: number;
  title: string;
  url: string;
}

const Points: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const navigation = useNavigation();

  const handleNavigateDetail = () => {
    navigation.navigate('Detail');
  };

  const handleSelectItem = (itemId: number) => {
    const indexExist = selectedItems.indexOf(itemId);
    if (indexExist >= 0) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  useEffect(() => {
    api.get('items').then((response) => {
      setItems(response.data);
    });
  }, []);

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
          {items.map((item) => (
            <Item
              key={String(item.id)}
              onPress={() => handleSelectItem(item.id)}
              isSelected={selectedItems.includes(item.id)}
            >
              <SvgUri width={42} height={42} uri={item.url} />
              <ItemTitle>{item.title}</ItemTitle>
            </Item>
          ))}
        </ScrollView>
      </ItemsContainer>
    </>
  );
};

export default Points;
