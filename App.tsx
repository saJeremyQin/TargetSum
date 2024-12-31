/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import Game from './src/components/Game';

function App(): React.JSX.Element {
  const [gameId, setGameId] = useState<number>(1);

  const resetGame = () => {
    setGameId((prevId)=> prevId+1);
  }

  return (
    <Game 
      gameKey={gameId} 
      randomNumbersCount={6} 
      initialSeconds={10} 
      onPlayAgain={resetGame} 
    />
  );
}

export default App;
