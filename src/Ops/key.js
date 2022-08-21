import CryptoJS from 'react-native-crypto-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const sec_generateKey = async () => {
    const value = await AsyncStorage.getItem('my_secret_key');
    console.log("AAAAAAAAAA", value);
    return value;
}

const sec_encryptData = (text, key) => {
    let ciphertext = CryptoJS.AES.encrypt(text, key).toString();
    return ciphertext;
}

const sec_decryptData = (ciphertext, key) => {
    let bytes = CryptoJS.AES.decrypt(ciphertext, key);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}

const AES_KEY = {
    generateKey: sec_generateKey,
    encryptData: sec_encryptData,
    decryptData: sec_decryptData,
}

export {
    AES_KEY,
}