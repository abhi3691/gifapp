import axios from 'axios';
import {AccessKey} from '@env';
import {BaseUrl} from '../../../../../staging';

export const getRandomImage = async () => {
  let data: string = '';
  try {
    let respone = await axios.get(`${BaseUrl}/random?client_id=${AccessKey}&`);
    data = respone?.data?.urls.full;
  } catch (error) {
    console.log('err', error);
  }
  return data;
};
