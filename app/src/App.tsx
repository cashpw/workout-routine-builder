import React from 'react';
import Routine from 'components/Routine/Routine';
import HeaderBar from 'components/HeaderBar/HeaderBar';
import { Container } from '@mui/material';
import 'App.css';

function App() {
  return (
    <>
      <HeaderBar />
      <Container
        maxWidth="sm"
      >
        <Routine />
      </Container>
    </>
  );
}

export default App;
