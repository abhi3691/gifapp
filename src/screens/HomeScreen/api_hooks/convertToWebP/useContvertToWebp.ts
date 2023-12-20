import {useState} from 'react';
import {NativeModules} from 'react-native';
import {getRandomImage} from '../getRandomImage/getRandomImmage';
const {WebPConverter} = NativeModules;

export const useConvertTOWebp = () => {
  const [convertedImage, setConvertedImage] = useState<string>('');
  const [orginalImage, setOrginalImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const convertToWebP = async () => {
    setLoading(true);
    let imageUrl = await getRandomImage();
    if (imageUrl) {
      try {
        WebPConverter.convertToWebP(imageUrl)
          .then((webpBase64: string) => {
            setOrginalImage(imageUrl);
            setConvertedImage(webpBase64);
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
  return {convertToWebP, loading, convertedImage, orginalImage};
};
