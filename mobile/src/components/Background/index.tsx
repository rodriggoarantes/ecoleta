import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const Background = styled(LinearGradient).attrs({
  colors: ['#eee', '#fff'],
})`
  flex: 1;
`;
