import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import RandomNumber from './RandomNumber'

// Define the type of Props
interface GameProps {
  randomNumbersCount: number
}

// export default function Game({title} : GameProps):  React.JSX.Element{
const Game:React.FC<GameProps> = ({randomNumbersCount}) => {
  const [randomNumbersArr, setRandomNumbersArr] = useState<number[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  // Function: Generate random numbers
  const generateRandomNumbers = (): number[] => {
    return Array.from({ length: randomNumbersCount }, () => 1 + Math.floor(10 * Math.random()));
  };

  // Only invoke once when initialize, to set random numbers array
  useEffect(() => {
    const numbers = generateRandomNumbers();
    setRandomNumbersArr(numbers);
  }, []);

  // Sum random numbers to generate target
  const target = randomNumbersArr.length > 0
    ? randomNumbersArr.slice(0, randomNumbersCount-2).reduce((acc, cur) => acc+cur, 0)
    : 0;

  // Refresh random numbers array
  const refreshTarget = (): void => {
    const numbers = generateRandomNumbers();
    setRandomNumbersArr(numbers);
    setSelectedNumbers([]);
  }

  // When RandomNumber is clicked, selectNumber of Game, which is the parent component of RandomNumber, will be invoked.
  const selectNumber = (index:number): void => {
    // console.log('selectedNumber index is %d', index);

    if(!selectedNumbers.includes(index)) {
      setSelectedNumbers((prevSelectedNumbers) => [...prevSelectedNumbers, index]);
    }
  }

  // Check whehter the number is Disabled or not.
  const isNumberSelected = (index:number): boolean => {
    return selectedNumbers.indexOf(index) !== -1;
  }

  // TO DO: Shuffle the random numbers

  return (
    <View style={styles.container}>
      <Pressable  onPress={refreshTarget}>
        <Text style={styles.target}>{target}</Text>
      </Pressable>
      <View style={styles.randomContainer}>
      {
        randomNumbersArr.map((randomNumber, index) => 
          <RandomNumber 
            key={index} 
            id={index}
            number={randomNumber} 
            isDisabled = {isNumberSelected(index)}
            onClick={()=> selectNumber(index)}
          />
        )
      }
      </View>  
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
      backgroundColor:"#ddd",
      flex: 1,
      paddingTop:50
    },
    target:{
      fontWeight:"700",
      fontSize: 30,
      backgroundColor:"#aaa",
      textAlign:"center",
      marginHorizontal: 20,
      marginTop:20
    },
    randomContainer:{
      flexDirection:"row", 
      flex:1,
      flexWrap:"wrap",
      justifyContent:"space-around"
    },
    randomNumber:{
      fontSize:24,
      width:150,
      backgroundColor:"#3c9",
      marginHorizontal:15,
      marginVertical: 15,
      textAlign:"center"
  }  
})

export default Game;