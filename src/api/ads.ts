import axios from 'axios';
import { Config } from '../config';
import { AdObject } from '../types';

export const fetchAds = async (): Promise<AdObject[]> => {
  try {
    const response = await axios.get<AdObject[]>(Config.ADS_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching ads:', error);
    throw new Error('Error fetching ads');
  }
};
