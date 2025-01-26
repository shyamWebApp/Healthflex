import { useState,useEffect } from "react";
import { Text, View ,TextInput, TouchableOpacity} from "react-native";
import { StyleSheet } from "react-native";

import Timer from "./Timer"

export default function Index() {
  
  return (
    <View
      style={{
        margin:30,
        flex:1,
        justifyContent:'flex-start',
        alignItems: "center",
      
        
        
      }}
    >
      
      <Text style={styles.text}>TIMER</Text>
    
      
<Timer />




    </View>
  );
}
const styles=StyleSheet.create({
  text:{
    fontFamily:'Poppins',
    fontSize:50,
    paddingBottom:30,
    color:'black'
  }

})
