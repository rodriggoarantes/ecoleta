import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import background from '../../assets/home-background.png';
import logo from '../../assets/logo.png';

export const Container = styled.ImageBackground.attrs({
  source: background,
  imageStyle: { width: 274, height: 368 },
})`
  flex: 1;
  padding: 0px 32px;
`;

export const Main = styled.View`
  flex: 1;
  justify-content: center;
`;

export const Logo = styled.Image.attrs({
  source: logo,
})``;

export const Title = styled.Text`
  color: #322153;
  font-size: 32px;
  font-family: 'Ubuntu_700Bold';
  max-width: 260px;
  margin-top: 64px;
`;

export const Description = styled.Text`
  color: #6c6c80;
  font-size: 16px;
  margin-top: 16px;
  font-family: 'Roboto_400Regular';
  max-width: 260px;
  line-height: 24px;
`;

export const Input = styled.TextInput`
  height: 60px;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 8px;
  font-size: 16px;
  padding: 0px 24px;
`;

export const Button = styled(RectButton)`
  background-color: #34cb79;
  height: 60px;
  flex-direction: row;
  border-radius: 10px;
  overflow: hidden;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 8px;
`;

export const BtnIcon = styled.View`
  height: 60px;
  width: 60px;
  background-color: rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
`;

export const BtnText = styled.Text`
  flex: 1;
  justify-content: center;
  text-align: center;
  color: #fff;
  font-family: 'Roboto_500Medium';
  font-size: 18px;
`;
