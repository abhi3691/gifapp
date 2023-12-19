import {View, Text, SafeAreaView, Image} from 'react-native';
import React from 'react';
import Buttons from 'react-native-custom-buttons';
import styles from './styles';
import colors from '../../components/constants/colors';
import {useConvertTOWebp} from './api_hooks/convertToWebP/useContvertToWebp';

const HomeScreen = () => {
  const {convertToWebP, convertedImage, loading, orginalImage} =
    useConvertTOWebp();

  // const randomImageToWebp = async () => {
  //   let randomImae = await getRandomImage();
  //   if (randomImae) {
  //     convertToWebP(randomImae);
  //   }
  // };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContnser}>
        <Buttons
          onPress={() => convertToWebP()}
          title="Random Image Generate"
          type="Text"
          containerStyles={styles.buttonStyle}
          loaderSize={20}
          loadercolor={colors.white}
          isLoading={loading}
          textStyle={styles.buttonText}
        />
      </View>
      <Text style={styles.title}>Webp Image</Text>
      <View style={styles.flexContainer}>
        {convertedImage && <Image src={convertedImage} style={styles.image} />}
      </View>
      <Text style={styles.title}>Normal Image</Text>
      <View style={styles.flexContainer}>
        {orginalImage && <Image src={orginalImage} style={styles.image} />}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
