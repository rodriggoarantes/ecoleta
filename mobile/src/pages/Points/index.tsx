import React, { useState, useEffect } from 'react';
import { ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';
import * as Location from 'expo-location';

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

interface Point {
  id: number;
  name: string;
  image: string;
  latitude: number;
  longitude: number;
}

const Points: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const navigation = useNavigation();

  const handleNavigateDetail = (id: number) => {
    navigation.navigate('Detail', { point_id: id });
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

  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Ooops...',
          'Precisamos de sua permissão para obter a localização'
        );
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = location.coords;
      setInitialPosition([latitude, longitude]);
    }
    loadPosition();
  }, []);

  useEffect(() => {
    api
      .get('points', {
        params: {
          uf: 'GO',
          city_id: 1,
          items: [1, 4],
        },
      })
      .then((response) => {
        setPoints(response.data);
      });
  }, []);

  return (
    <>
      <Container>
        <BackButton />
        <Title>{content.title}</Title>
        <Description>{content.description}</Description>

        <MapContainer>
          {initialPosition[0] !== 0 && (
            <MapView
              initialRegion={{
                latitude: initialPosition[0],
                longitude: initialPosition[1],
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}
            >
              {points.map((point) => (
                <MapMarker
                  key={String(point.id)}
                  coordinate={{
                    latitude: point.latitude,
                    longitude: point.longitude,
                  }}
                  onPress={() => handleNavigateDetail(point.id)}
                >
                  <MapMarkerContainer>
                    <MapMarkerImage source={{ uri: point.image }} />
                    <MapMarkerTitle>{point.name}</MapMarkerTitle>
                  </MapMarkerContainer>
                </MapMarker>
              ))}
            </MapView>
          )}
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
