import { Pressable, StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect, useMemo, useRef } from 'react'
import { useState } from 'react'
import RandomNumber from './RandomNumber'

// Define the type of Props
interface GameProps {
  randomNumbersCount: number
}

const shuffleArray = (array: number[]): number[] => {
  const shuffledArray = [...array]; // Create a copy to avoid mutating the original array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap
  }
  return shuffledArray;
};


// export default function Game({title} : GameProps):  React.JSX.Element{
const Game:React.FC<GameProps> = ({randomNumbersCount}) => {
  const [randomNumbersArr, setRandomNumbersArr] = useState<number[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(10);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  // Function: Generate random numbers
  const generateRandomNumbers = (): number[] => {
    return Array.from({ length: randomNumbersCount }, () => 1 + Math.floor(10 * Math.random()));
  };

  // Clear timer
  const clearTimer = () : void => {
    if (timerId.current) {
      clearInterval(timerId.current);
      timerId.current = null;
    }
  }

  const startTimer = (duration: number = 10): void => {
    clearTimer();
    // reset the remaining seconds
    setRemainingSeconds(duration);
  
    // restart a new timer
    timerId.current = setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
  };
  

  // Only invoke once when initialize, to set random numbers array
  // start Timer as well
  useEffect(() => {
    const numbers = generateRandomNumbers();
    setRandomNumbersArr(numbers);

    // when component unmount, clear the timer
    return clearTimer();
  }, []);

  // after randomNumbersArray is set up, start timer
  useEffect(() => {
    if(randomNumbersArr.length > 0) 
      startTimer(10);
  },[randomNumbersArr])

  // Sum random numbers to generate target
  const target = useMemo(() => {
    return randomNumbersArr.length > 0 ? shuffleArray([...randomNumbersArr]).slice(0, randomNumbersCount-2).reduce((acc, cur) => acc+cur, 0) : 0;
  },[randomNumbersArr]);
  
  // Refresh random numbers array
  const refreshTarget = (): void => {
    const numbers = generateRandomNumbers();
    setRandomNumbersArr(numbers);
    setSelectedIds([]);
    startTimer(10);
  }

  // When RandomNumber is clicked, selectNumber of Game, which is the parent component of RandomNumber, will be invoked.
  const selectNumber = (index:number): void => {
    // console.log('selectedNumber index is %d', index);

    if(!selectedIds.includes(index)) {
      setSelectedIds((prevSelectedIds) => [...prevSelectedIds, index]);
    }
    startTimer(10);
  }

  // gameStatus: Playing, Won, Lost
  const gameStatus = useMemo(() : GameStatus => {
    const sumSelcted = selectedIds.reduce((acc, cur) => acc+randomNumbersArr[cur], 0);
    if(remainingSeconds === 0) 
      return 'Lost';
    if(sumSelcted > target)
       return 'Lost';
    else if(sumSelcted === target) 
       return 'Won';
    else
       return 'Playing';       
  },[randomNumbersArr, selectedIds, remainingSeconds]);

  useEffect(() => {
    if(gameStatus!== 'Playing') {
      // if(timerId.current) {
      //   clearInterval(timerId.current);
      //   timerId.current =null
      // }
      clearTimer();
    }
  }, [gameStatus]);

  // Check whehter the number is Disabled or not.
  const isNumberSelected = (index:number): boolean => {
    return selectedIds.indexOf(index) !== -1;
  }

  // TO DO: Shuffle the random numbers

  // const gameStatus = gameStatus();
  return (
    <View style={styles.container}>
      <Pressable  onPress={refreshTarget}>
        <Text style={[styles.target, styles[`STATUS_${gameStatus as GameStatus}`]]}>
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
            isDisabled = {isNumberSelected(index) || gameStatus!=='Playing'}
            onClick={()=> selectNumber(index)}
          />
        )
      }
      </View>  
      <Text style={styles.status}>{gameStatus}</Text>
      <View style={styles.notifyArea}>
      {
        gameStatus === "Playing" ? 
        (<Text style={styles.timer}>{remainingSeconds}</Text>) : 
        (<Button title="Play Again" color="#47a" onPress={()=> {}} />)
      }
      </View>
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
      fontSize:28,
      flexGrow:0.15
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
    timer: {
      textAlign:"center",
      fontSize:28,
      flexGrow:0.15
    },
    notifyArea:{
      flexGrow:0.15
    },
    playAgainBtn: {
      // backgroundColor:"#47a",
      // flexGrow:0.15
    }
})

type GameStatus = "Playing" | "Won" | "Lost";

export default Game;