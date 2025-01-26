
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

const TimerApp = () => {
  const router=useRouter();
  const [name, setName] = useState(''); // Timer name
  const [duration, setDuration] = useState(''); // Timer duration in seconds
  const [category, setCategory] = useState(''); // Timer category
  const [remainingTime, setRemainingTime] = useState(0); // Remaining time for the countdown
  const [isRunning, setIsRunning] = useState(false); // Timer running state
  const [intervalId, setIntervalId] = useState(null); // Interval ID for the timer

  // Load the saved timer data when the component mounts
  useEffect(() => {
    const loadTimerData = async () => {
      try {
        const savedName = await AsyncStorage.getItem('name');
        const savedDuration = await AsyncStorage.getItem('duration');
        const savedCategory = await AsyncStorage.getItem('category');

        if (savedName && savedDuration && savedCategory) {
          setName(savedName);
          setDuration(savedDuration);
          setCategory(savedCategory);
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    };
  loadTimerData();
    
  }, []);

  // Save timer data to AsyncStorage
  const saveTimerData = async () => {
    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('duration', duration);
      await AsyncStorage.setItem('category', category);
      Alert.alert('Data Saved', 'Your timer data has been saved.');
      loadTimerData();
     
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
    router.push('history')
    clearInterval(intervalId);
    setIsRunning(false);
  };

  // Start the timer based on user input
  const startTimer = () => {
    const durationInSeconds = parseInt(duration, 10);
    if (!durationInSeconds || durationInSeconds <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid duration.');
      return;
    }

    setRemainingTime(durationInSeconds); // Set initial time
    const id = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(id);
          setIsRunning(false);
          Alert.alert('Time Up!', 'Your timer has finished.');
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000); // Update every second
    setIntervalId(id);
    setIsRunning(true);
  };

  // Stop the timer
  const stopTimer = () => {
    clearInterval(intervalId);
    setIsRunning(false);
  };

  // Reset the timer
  const resetTimer = () => {
    clearInterval(intervalId);
    setRemainingTime(0);
    setIsRunning(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      

      <TextInput
        style={styles.input}
        placeholder="Timer Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Duration in Seconds"
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration} 
      />

     
       <Picker style={{width:180,height:40,borderWidth:1,borderColor:'black'}}

  onValueChange={(itemValue, itemIndex) =>{
    setCategory(itemValue)
    }
  }>
    <Picker.Item label="Workout" value="Workout" />
   <Picker.Item label="Study" value="Study" />
   <Picker.Item label="Break" value="Break" />
</Picker>
      

      <Text style={styles.timerText}>{formatTime(remainingTime)}</Text>

      <View style={styles.buttonsContainer}>
        {!isRunning ? (
          <TouchableOpacity style={{width:100,height:30,backgroundColor:'green',justifyContent:'center',alignItems:'center',borderRadius:10}} onPress={startTimer} >
            <Text style={styles.btntxt}>START</Text>
          </TouchableOpacity>  
        ) : (
          <TouchableOpacity style={{width:100,height:30,backgroundColor:'red',justifyContent:'center',alignItems:'center',borderRadius:10}} onPress={stopTimer}>
            <Text style={styles.btntxt}>STOP</Text>
          </TouchableOpacity> 
        )}
        <TouchableOpacity style={{width:100,height:30,backgroundColor:'red',justifyContent:'center',alignItems:'center',borderRadius:10}}  onPress={resetTimer}>
          <Text style={styles.btntxt}>RESET</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={saveTimerData} style={{width:100,height:30,backgroundColor:'black',borderRadius:10,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'white',fontSize:20}}>HISTORY</Text>
          </TouchableOpacity>
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  btntxt:{
    color:'white',
    fontSize:20

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
    padding: 8,
  },
  timerText: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    marginTop: 20,
    width: '60%',
    gap:10,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
});

export default TimerApp;
