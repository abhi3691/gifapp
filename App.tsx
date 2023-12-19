import {StatusBar} from 'react-native';
import React, {Fragment} from 'react';
import HomeScreen from './src/screens/HomeScreen';
import colors from './src/components/constants/colors';
const App = () => {
  return (
    <Fragment>
      <StatusBar backgroundColor={colors.black} barStyle={'light-content'} />
      <HomeScreen />
    </Fragment>
  );
};

export default App;
