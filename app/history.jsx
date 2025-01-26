import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet,FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function GetValue() {
  const [storedData, setStoredData] = useState([]);
  

  const getData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const data=await AsyncStorage.multiGet(keys);
      
      const formattedData=data.map(([key,value])=>({key,value}));
      setStoredData(formattedData)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  
  return (
    <View style={styles.container}>
      <FlatList
        data={storedData}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.item}>
            
            <Text style={styles.text}>Value: {item.value}</Text>
          </View>
        )}
      />
      
      <Button title="Refresh Data" onPress={getData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
