import { Clipboard } from '@react-native-community/clipboard';

const readFromClipboard = async () => {
  const clipboardContent = await Clipboard.getString();
  return clipboardContent;
};

const writeToClipboard = async (text) => {
  alert('İçinde !');
  await Clipboard.setString(text);
  alert('Kopyalandi !');
};

export { writeToClipboard, readFromClipboard };