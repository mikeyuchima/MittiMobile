import {RNS3} from 'react-native-aws3';
import {AWS3_INFO} from '../constants/constants';

export const upload = (userId, imageData) => {
  const time = (new Date(imageData.timestamp)).getTime();
  const filename = [userId, time, imageData.fileName].join('_');
  const file = {
    uri: imageData.uri,
    name: filename,
    type: imageData.type,
  };
  const options = {
    ...AWS3_INFO,
    successActionStatus: 201,
  };

  return RNS3.put(file, options);
};