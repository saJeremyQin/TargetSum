import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

interface RandomNumberProps {
    id: number,
    number: number,
    isDisabled: boolean,
    onClick: Function,
    backgroundColor?:string;
}

// export default function RandomNumber({number}: RandomNumberProps): React.JSX.Element {
const RandomNumber: React.FC<RandomNumberProps> = ({id, number, isDisabled, onClick, backgroundColor="#3c9"}) => {
    const handlePress = () =>{
        if(!isDisabled) {
            console.log(`${number} is clicked,`+`its index is ${id}`);            
            onClick(id);  
        }
    }
    return (
        <Pressable onPress={handlePress} style={styles.pressable}>
            <Text style={[styles.numberBox, {backgroundColor, opacity: isDisabled ? 0.5:1}]}>{number}</Text>
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