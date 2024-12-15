import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface RandomNumberProps {
    number: number,
    backgroundColor?:string;
}

// export default function RandomNumber({number}: RandomNumberProps): React.JSX.Element {
const RandomNumber: React.FC<RandomNumberProps> = ({number, backgroundColor="#3c9"}) => {
  return (
      <Text style={[styles.numberBox, {backgroundColor}]}>{number}</Text>
  )    
}

const styles = StyleSheet.create({
    numberBox:{
        fontSize:24,
        width:150,
        // backgroundColor:"#0f0",
        marginHorizontal:15,
        marginVertical: 15,
        textAlign:"center"
    }  
})

export default RandomNumber;