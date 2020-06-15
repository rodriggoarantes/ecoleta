import styled from 'styled-components/native';

import background from '../../assets/home-background.png';
import logo from '../../assets/logo.png';

export const Container = styled.ImageBackground.attrs({
  source: background,
  imageStyle: { width: 274, height: 368 },
})`
  flex: 1;
  justify-content: center;
  padding: 0px 32px;
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
