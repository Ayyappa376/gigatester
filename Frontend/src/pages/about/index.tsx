import React from 'react';
import { Text } from '../../common/Language';
import { Button, Grid, Paper, Typography } from "@material-ui/core";


const About = () => {
  return (
    <div>
      <p style={{padding: "50px"}}>
        <Typography variant="h4"><Text tid='aboutUs' /></Typography>
        GigaTester is a one stop solution that enables high quality product to be launched quickly and confidently at scale.
      </p>
      <p style={{padding: "10px 50px"}}>
        <Typography variant="h6">Become a Tester?</Typography>
        <Typography>
          Register as tester, search with the name of devices that you will test on,
          choose from a wide range of products and provide valuable early feedback.
          Earn for each successful tests completed.
        </Typography>
        <Typography>
          Click <i>'Register as Tester'</i> on home page.
        </Typography>
      </p>
      <p style={{padding: "10px 50px"}}>
        <Typography variant="h6">Test my Product?</Typography>
        <Typography>
          Register your company to get your products crowd tested by professional testers
          and end users. Receive valuable feedback, bugs, recomendations; communicate with 
          them and derive valuable insights.
        </Typography>
        <Typography>
          Click <i>'Register your Company'</i> on home page.
        </Typography>
      </p>
    </div>
  );
};
export default About;
