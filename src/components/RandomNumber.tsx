import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface RandomNumberProps {
    number: number,
    backgroundColor?:string;
}

// export default function RandomNumber({number}: RandomNumberProps): React.JSX.Element {
const RandomNumber: React.FC<RandomNumberProps> = ({number, backgroundColor="#3c9"}) => {
    const handlePress = () =>{
        console.log(`${number} is clicked`);
    }
    return (
        <Pressable onPress={handlePress} style={styles.pressable}>
            <Text style={[styles.numberBox, {backgroundColor}]}>{number}</Text>
        </Pressable>   
    )    
}

const styles = StyleSheet.create({
    pressable:{
        margin:10
    },
    numberBox:{
        fontSize:24,
        width:150,
        height:50,              //When <Text> is nested in <Pressable>, need clear size to paint it.
        textAlign:"center",
        paddingVertical:10,
    }  
})

export default RandomNumber;