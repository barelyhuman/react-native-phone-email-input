import React, {useState} from 'react';
import PhoneEmailMixedInput from '@barelyhuman/react-native-phone-email-input/src';
import {SafeAreaView, StyleSheet} from 'react-native';

function App() {
  const [value, setValue] = useState('2025550152');

  return (
    <SafeAreaView style={{backgroundColor: 'white', height: '100%', flex: 1}}>
      <PhoneEmailMixedInput
        value={value}
        defaultCountryCode={'US'}
        onChange={e => setValue(e)}
        countryPickerProps={{
          containerButtonStyle: styles.pickerButton,
        }}
        textInputProps={styles.input}
        textContainerProps={styles.textContainer}
        containerProps={styles.container}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pickerButton: {
    minWidth: 100,
    fontSize: 11,
    padding: 10,
    height: 52,
  },
  input: {
    autoCapitalize: false,
    style: {
      fontSize: 16,
    },
  },
  textContainer: {
    style: {
      flex: 2,
      height: 52,
      fontSize: 16,
      marginLeft: 4,
      justifyContent: 'center',
    },
  },
  container: {
    margin: 10,
    flexDirection: 'row',
    borderRadius: 6,
    shadowColor: '#000',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default App;
