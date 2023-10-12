import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'

    const  Todo = (props) =>{
        return (
            <View style={styles.todoWrapper}>
                <View style={styles.todoContent}>
                    <View style={styles.square}></View>
                    <Text style={styles.todoText}>{props.title}</Text>
                </View>
                <View style={styles.circle}></View>
            </View>
        )
    }

const styles = StyleSheet.create({
    todoWrapper: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        padding: 15,
        margin: 13,
        marginBottom: 2,
        marginHorizontal: 15,
        backgroundColor: "rgb(88, 87, 87)",
        borderRadius: 12 ,

    },
    todoText: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#ffffff"
    },
    todoContent: {
        flexDirection:'row',
        justifyContent: "space-between",
        flexWrap: "wrap",
        maxWidth: "80%",
        alignItems:'center',
    },
    square: {
        width: 15,
        height: 15,
        borderRadius: 5,
        marginRight: 10,
        backgroundColor:"#7081cc",
        opacity: 0.5
    },
    circle: {
        width: 12,
        height: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "rgb(150, 178, 230)" ,
        backgroundColor:"rgb(174, 197, 240)",
    },
})
export default Todo;