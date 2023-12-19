import axios from 'axios';
import {AccessKey} from '@env';

export const getRandomImage = async () => {
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
