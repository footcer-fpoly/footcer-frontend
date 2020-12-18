import AsyncStorage from '@react-native-community/async-storage';

const KEY_TOKEN = 'access_token';
const KEY_DOMAIN = 'domain';

export const saveToken = (token) => AsyncStorage.setItem(KEY_TOKEN, token);
export const saveDomain = (url) => AsyncStorage.setItem(KEY_DOMAIN, url);
export const getToken = () => AsyncStorage.getItem(KEY_TOKEN);
export const getDomain = () => AsyncStorage.getItem(KEY_DOMAIN);
export const removeToken = () => AsyncStorage.removeItem(KEY_TOKEN);
