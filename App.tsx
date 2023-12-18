import {
  StatusBar,
  SafeAreaView,
  Image,
  View,
  NativeModules,
  Text,
} from 'react-native';
import React, {Fragment, useState} from 'react';
import colors from './src/components/constants/colors';
import Buttons from 'react-native-custom-buttons';
import ScreenRatio from './src/components/constants/ScreenRatio';
import axios from 'axios';
import {RFValue} from 'react-native-responsive-fontsize';
const {WebPConverter} = NativeModules;
import {AccessKey} from '@env';

const getRandomImage = async () => {
  let data: string = '';
  try {
    let respone = await axios.get(
      `https://api.unsplash.com/photos/random?client_id=${AccessKey}&`,
    );
    data = respone?.data?.urls.full;
  } catch (error) {
    console.log('err', error);
  }
  return data;
};

const App = () => {
  const [orginal, setOrginal] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const convertToWebP = async () => {
    setLoading(true);
    let imageUrl = await getRandomImage();
    if (imageUrl) {
      try {
        WebPConverter.convertToWebP(imageUrl)
          .then((webpBase64: string) => {
            setOrginal(imageUrl);
            setImage(webpBase64);
            setLoading(false);
          })
          .catch((error: string) => {
            console.error('Error converting to WebP:', error);
            setLoading(false);
          });
      } catch (error) {
        console.error('Error converting PNG to base64:', error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <StatusBar backgroundColor={colors.black} barStyle={'light-content'} />
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 0.5}}>
          <Buttons
            onPress={() => convertToWebP()}
            title="convert To webp"
            type="Text"
            containerStyles={{
              height: 50,
              margin: 20,
              borderRadius: 10,
              width: ScreenRatio.width / 1.1,
              alignSelf: 'center',
              backgroundColor: colors.black,
            }}
            loaderSize={20}
            loadercolor={colors.white}
            isLoading={loading}
            textStyle={{color: colors.white, fontSize: 20}}
          />
        </View>
        <View style={{flex: 1}}>
          <Text style={{fontSize: RFValue(20), color: colors.black}}>
            WEBP IMAGE
          </Text>
          {image && (
            <Image
              source={{uri: image}}
              style={{height: '100%', width: '100%'}}
            />
          )}
        </View>
        <View style={{flex: 1, marginVertical: 50}}>
          <Text style={{fontSize: RFValue(20), color: colors.black}}>
            Normal IMAGE
          </Text>
          {orginal && (
            <Image
              source={{uri: orginal}}
              style={{height: '100%', width: '100%'}}
            />
          )}
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
