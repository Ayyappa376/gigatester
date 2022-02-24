import React, { FC } from "react";
import PropTypes from "prop-types";
import Webview from "react-native-webview";
import Screen from "../components/Screen";

interface PROP {
  route: {
    params: {
      id: number;
    };
  };
}

const WebViewScreen: FC<any> = () => {
  // const { id } = route.params;
  const url = `https://s3.amazonaws.com/dev.gigatester.io/dist/feedback-agent/browser/gigatester_script.js`;
  const html = `
      <script>
      window.GigaTester = window.GigaTester || {};
      GigaTester.apiKey = 'ic8xdi1MKC2m7M5wEe8OM23qqXyI4aWy96qZW72T';
      GigaTester.productVersion = '0.1';
      GigaTester.endpoint = 'https://qe1lgcnkwh.execute-api.us-east-1.amazonaws.com/development';
      (function(d) {
        var s = d.createElement('script'); 
        s.async = true;
        s.src = 'https://s3.amazonaws.com/dev.gigatester.io/dist/feedback-agent/browser/gigatester_script.js';
        (d.head || d.body).appendChild(s);
      })(document);
    </script>
    `;
  return (
    <Screen>
      <Webview source={{ html }} />
    </Screen>
  );
};

export default WebViewScreen;

WebViewScreen.propTypes = {
  route: PropTypes.any,
};
