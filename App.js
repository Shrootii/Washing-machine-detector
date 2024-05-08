import { StatusBar } from 'expo-status-bar';
// App.js
// App.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Notification from './Notification';
import WashingMachineButton from './MachineButton';
import { checkMachineAvailability } from './Services/DatabaseService';
import axios from 'axios'; // Import axios for making HTTP requests

const App = () => {
  const [machineAvailable, setMachineAvailable] = useState(null);
  const [showNotification, setShowNotification] = useState(false);


  const fetchMachineData = async () => {
    // try {
      // const response = await axios.get('http://your-api-url/api/machineData/latest');
      // const { status } = response.data;
      // setMachineAvailable(status);
      const machineAvailable = await checkMachineAvailability();
      setMachineAvailable(machineAvailable);

      if (machineAvailable !== 'running') {
        setShowNotification(true); // Show notification only if machine is available
      } else {
        setShowNotification(false); // Hide notification if machine is running
      }

      if (machineAvailable !== 'running') {
        setTimeout(fetchMachineData, 15 * 60 * 1000);
      }
    // } catch (error) {
    //   console.error('Error fetching machine data:', error);
    // }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.additionalText}>
        {machineAvailable === false && 'Washing machine is currently not available. Please wait.'}
        {/* {machineStatus === 'running' ? 'Washing machine is currently in use' : 'Washing machine is available'} */}
      </Text>
      <WashingMachineButton onPress={fetchMachineData} />
      <Notification show={showNotification} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3E8FF', 
  },
  additionalText: {
    marginBottom: 20,
    fontSize: 16,
    color: '#6A0DAD', 
  },
});

export default App;