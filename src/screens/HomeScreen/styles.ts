import {StyleSheet} from 'react-native';
import ScreenRatio from '../../components/constants/ScreenRatio';
import colors from '../../components/constants/colors';
import {RFValue} from 'react-native-responsive-fontsize';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  buttonContnser: {
    height: ScreenRatio.height / 8,
  },
  buttonStyle: {
    height: 50,
    margin: 20,
    borderRadius: 10,
    width: ScreenRatio.width / 1.1,
    alignSelf: 'center',
    backgroundColor: colors.black,
  },
  buttonText: {
    color: colors.white,
    fontSize: RFValue(14),
  },
  flexContainer: {
    height: ScreenRatio.height / 3,
    marginBottom: ScreenRatio.height / 20,
    elevation: 4,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: RFValue(15),
    color: colors.blue,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
});

export default styles;
