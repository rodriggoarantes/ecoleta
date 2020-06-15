import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: Platform.OS === 'ios' ? 'padding' : 'height',
})`
  flex: 1;
  padding: 0px;
`;

export const Safe = styled.SafeAreaView`
  flex: 1;
  margin-top: ${Platform.OS === 'android' ? '24px' : '0px'};
`;
