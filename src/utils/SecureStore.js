import SInfo from 'react-native-sensitive-info';

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

const SHARED_PERFS = 'ObytesSharedPerfs';
const KEYCHAIN_SERVICE = 'ObytesKeychain';
const keyChainOptions = {
    sharedPreferencesName: SHARED_PERFS,
    keychainService: KEYCHAIN_SERVICE,
};
export async function getItem(key) {
    const value = await SInfo.getItem(key, keyChainOptions);
    return value ? JSON.parse(value)?.[key] || null : null;
}
export async function setItem(key, value) {
    SInfo.setItem(key, JSON.stringify({ [key]: value }), keyChainOptions);
}
export async function removeItem(key) {
    SInfo.deleteItem(key, keyChainOptions);
}

export const fetchAccessToken = () => getItem(ACCESS_TOKEN);
export const removeAccessToken = () => removeItem(ACCESS_TOKEN);
export const storeAccessToken = (value) => setItem(ACCESS_TOKEN, value);

export const fetchRefreshToken = () => getItem(REFRESH_TOKEN);
export const removeRefreshToken = () => removeItem(REFRESH_TOKEN);
export const storeRefreshToken = (value) => setItem(REFRESH_TOKEN, value);