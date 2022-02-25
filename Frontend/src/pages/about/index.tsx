import React from 'react';
import { Text } from '../../common/Language';
import { Button, Grid, Paper, Typography } from "@material-ui/core";


const About = () => {
  return (
    <div>
      <p style={{padding: "50px"}}>
        <Typography variant="h4"><Text tid='aboutUs' /></Typography>
        GigaTester is a platform that empowers you to develop and launch great products with confidence.
      </p>
      <p style={{padding: "10px 50px"}}>
        <Typography variant="h6">GigaTester Feedbacks</Typography>
        <Typography>
        Customers give unbiased opinions. Get the feedback from them and build the product they love.
        GigaTester enables Product teams to capture feedback and bugs reported by customers
        directly without going through middle layer.
        </Typography>
      </p>
      <p style={{padding: "10px 50px"}}>
        <Typography variant="h6">Contact Details</Typography>
        <Typography>
          Address:
        </Typography>
        <Typography>
          Phone no.:
        </Typography>
        <Typography>
          Email: contact@gigatester.io
        </Typography>
      </p>
    </div>
  );
};
export default About;
