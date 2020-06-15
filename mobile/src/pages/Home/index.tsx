import React from 'react';
import { Logo, Title, Description, Container } from './styles';

export default function Home() {
  return (
    <Container>
      <Logo />
      <Title>Seu marketplace de coleta de resíduos</Title>
      <Description>
        Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente
      </Description>
    </Container>
  );
}
