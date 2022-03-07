import React from 'react';
import { View, Text} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const ScreenshotIcon = () => {
  return (
    <Svg width="30" height="30" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 117.52">
      <Path fill-rule="evenodd" clip-rule="evenodd" fill="black" d="M74.01,0v11.98H19.13c-3.93,0.01-7.14,3.22-7.15,7.15v17.74H0V19.13c0-1.07,0.09-2.09,0.26-3.14 c0.91-5.37,3.99-10,8.56-12.96c3.13-2,6.6-3.01,10.31-3.03H74.01L74.01,0z M106.86,101.52v16H94.87v-16H79.6V89.53h15.27V69.72 h11.98v19.81h16.03v11.98H106.86L106.86,101.52z M0,48.85h11.98v33.53c0.01,2.69,1.52,5.12,3.9,6.36L10.4,99.4 c-3.97-2.06-7.06-5.36-8.84-9.46C0.52,87.51,0.01,85.02,0,82.39V48.85L0,48.85z M24.89,101.52V89.53h42.73v11.98H24.89 L24.89,101.52z M106.85,57.74H94.87V19.13c-0.01-3.93-3.22-7.14-7.15-7.15h-1.73V0h1.73c1.07,0,2.09,0.09,3.14,0.26 c5.37,0.91,10,3.99,12.96,8.56c2,3.13,3.01,6.6,3.03,10.31V57.74L106.85,57.74z"/>
    </Svg>
  )
};

export default ScreenshotIcon;