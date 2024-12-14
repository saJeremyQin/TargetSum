/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Game from './src/components/Game';

function App(): React.JSX.Element {

  return (
    <Game randomNumbersCount={6}></Game>
  );
}

export default App;
