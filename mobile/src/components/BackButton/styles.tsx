import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

export const Back = styled.TouchableOpacity``;

export const Icon = styled(Feather).attrs({
  name: 'arrow-left',
  size: 20,
  color: '#34cb79',
})``;
