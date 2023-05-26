/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Button, TextInput} from './src/components';
import useCardInput from './src/hooks/useCardInput';
import useCVVInput from './src/hooks/useCVVInput';
import useDateInput from './src/hooks/useDateInput';
import useNameInput from './src/hooks/useNameInput';

type AppProps = {
  submit?: () => {};
};

const App: React.FC<AppProps> = ({submit}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {
    formattedValue: date,
    handleTextChange: setDate,
    errorMessage: dateError,
  } = useDateInput();
  const {
    formattedValue: card,
    handleTextChange: setCard,
    errorMessage: cardError,
  } = useCardInput(true);

  const {
    formattedValue: cvv,
    handleTextChange: setCVV,
    errorMessage: cvvError,
  } = useCVVInput();

  const {
    formattedValue: name,
    handleTextChange: setName,
    errorMessage: nameError,
  } = useNameInput();

  const {
    formattedValue: lastName,
    handleTextChange: setLastName,
    errorMessage: lastNameError,
  } = useNameInput();

  const isValid = React.useMemo(() => {
    let isWithErrors =
      dateError || cardError || cvvError || nameError || lastNameError;
    let isWithEmptyValues = !date || !card || !cvv || !name || !lastName;

    return !(isWithErrors || isWithEmptyValues);
  }, [
    date,
    dateError,
    card,
    cardError,
    cvv,
    cvvError,
    name,
    nameError,
    lastName,
    lastNameError,
  ]);

  const handleSubmit = () => {
    if (submit) {
      submit();
      return;
    }
    Alert.alert(
      'Payment Successful',
      '',
      [
        {
          text: 'Ok',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Credit Card Input Exercise</Text>
      </View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scroll}>
        <View style={styles.form}>
          <TextInput
            value={card}
            onChangeText={setCard}
            keyboardType="numeric"
            maxLength={19}
            placeholder="Card Number"
            errorMessage={cardError}
          />
          <View style={styles.row}>
            <TextInput
              value={date}
              onChangeText={setDate}
              keyboardType="numeric"
              maxLength={5}
              placeholder="MM/YY"
              errorMessage={dateError}
            />
            <TextInput
              value={cvv}
              onChangeText={setCVV}
              keyboardType="numeric"
              maxLength={4}
              placeholder="CVV"
              errorMessage={cvvError}
            />
          </View>
          <View style={styles.row}>
            <TextInput
              value={name}
              onChangeText={setName}
              maxLength={255}
              placeholder="Name"
              errorMessage={nameError}
            />
            <TextInput
              value={lastName}
              onChangeText={setLastName}
              maxLength={255}
              placeholder="Last Name"
              errorMessage={lastNameError}
            />
          </View>
          <Button
            onPress={handleSubmit}
            disabled={!isValid}
            title="SUBMIT PAYMENT"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  header: {
    backgroundColor: 'blue',
    padding: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    columnGap: 10,
  },
  form: {
    margin: 15,
  },
});

export default App;
