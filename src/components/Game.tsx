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
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

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
    setSelectedIds([]);
  }

  // When RandomNumber is clicked, selectNumber of Game, which is the parent component of RandomNumber, will be invoked.
  const selectNumber = (index:number): void => {
    // console.log('selectedNumber index is %d', index);

    if(!selectedIds.includes(index)) {
      setSelectedIds((prevSelectedIds) => [...prevSelectedIds, index]);
    }
  }

  // gameStatus: Playing, Won, Lost
  const gameStatus = () : GameStatus => {
    const sumSelcted = selectedIds.reduce((acc, cur) => acc+randomNumbersArr[cur], 0);
    if(sumSelcted > target)
       return 'Lost';
    else if(sumSelcted === target) 
       return 'Won';
    else
       return 'Playing';       
  }

  // Check whehter the number is Disabled or not.
  const isNumberSelected = (index:number): boolean => {
    return selectedIds.indexOf(index) !== -1;
  }

  // TO DO: Shuffle the random numbers

  // const gameStatus = gameStatus();
  return (
    <View style={styles.container}>
      <Pressable  onPress={refreshTarget}>
        <Text style={[styles.target, styles[`STATUS_${gameStatus() as GameStatus}`]]}>
          {target}
        </Text>
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
      <Text style={styles.status}>{gameStatus()}</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
      backgroundColor:"#ddd",
      flex: 1,
      paddingTop:50,
      // justifyContent: "space-evenly"
    },
    target:{
      fontWeight:"700",
      fontSize: 30,
      backgroundColor:"#aaa",
      textAlign:"center",
      marginHorizontal: 20,
      marginTop:50,
    },
    randomContainer:{
      marginTop:30,
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
    },
    status: {
      textAlign:"center",
      fontSize:32,
      flexGrow:0.25
    },
    STATUS_Playing: {
      backgroundColor: "gray",
    },
    STATUS_Won: {
      backgroundColor: "green",
    },
    STATUS_Lost: {
      backgroundColor: "red",
    },
})

type GameStatus = "Playing" | "Won" | "Lost";


export default Game;