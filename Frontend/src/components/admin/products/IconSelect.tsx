import React, {useEffect, useState, useRef, Fragment} from 'react';
import {
	Grid,
	Typography,
	TextField,
	makeStyles,
	Box,
  Button,
} from '@material-ui/core';
import IconProgressBar from './IconProgressBar';
import { buttonStyle, tooltipTheme } from '../../../common/common';
import { setBeforeAuthorizedRequestAction } from '../../../utils/http';


const useStyles = makeStyles((theme) => ({
  iconTitle: {
    fontSize: '15px',
    fontWeight: 500,
    color: 'black',
    marginTop: '10px',
    textAlign: 'left',
  },
  uploadBtn: {
    marginTop: '10px',
    width: '120px',
    ...buttonStyle,
  },
  preview: {
    marginBottom: '16px',
    fontSize: '15px',
    fontWeight: 500,
  }
}));

interface IconProps {
  iconType: string;
  product: any;
  handleIconChange: Function;
}


const IconSelect = ({ iconType, product, handleIconChange }: IconProps) => {
  const [icon, setIcon] = useState('');
  const [base64data, setBase64] = useState<string | undefined>();
  const classes = useStyles();

  useEffect(() => {
    if (product[0].feedbackAgentSettings &&
      product[0].feedbackAgentSettings.widgetLookAndFeel && product[0].feedbackAgentSettings.widgetLookAndFeel.icon) {
      if (product[0].feedbackAgentSettings.widgetLookAndFeel.icon[iconType]) {
        const returnedIcon = product[0].feedbackAgentSettings.widgetLookAndFeel.icon[iconType].replace(/\<\?xml.+\?\>|\<\!DOCTYPE.+]\>/g, '');
        convertSVG(returnedIcon);
        setIcon(returnedIcon)
      } else {
        setIcon('')
      }
    }
  }, [product])

  const convertSVG = (icon: string) => {
    const buff = new Buffer(icon);
    let base64dataStr = buff.toString('base64');
    setBase64(base64dataStr)
    return base64dataStr;
  }

  const handleIconUpdate = (event: any) => {
    setIcon(event.target.value);
    convertSVG(event.target.value)
    handleIconChange({ type: iconType, iconStr: event.target.value});
  }


  const handleChange = (event: any) => {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
      if (event.target !== null && event.target.result) {
        const resultString = event.target.result?.toString();
        convertSVG(resultString)
        setIcon(resultString)
        handleIconChange({type: iconType, iconStr: resultString});
      }
    };
    reader.readAsText(file);
  }



  return (
    <Fragment>
      <Typography className={classes.iconTitle}>Icon:</Typography>
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
    }}>
      <Box sx={{
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
        <Box sx={{ marginTop: '10px'}}>
            <input type="file" id={`svg-${iconType}-upload`} accept='image/svg+xml' onChange={e => handleChange(e)} style={{ display: 'none'}}></input>
          <label htmlFor={`svg-${iconType}-upload`}>
             <Button className={classes.uploadBtn} variant="contained" component="span">Upload</Button>
          </label>
        </Box>

        <Box sx={{
          width: '100%',
          height: '90%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingLeft: '10px',
          paddingTop: '5px',
          // maxHeight: '200px',
          // overflow: 'scroll',
        }}>
          <Typography style={{ marginTop: '20px', marginRight: '10px' }}>or</Typography>
          {/* <IconProgressBar /> */}
          <TextField
          style={{ width: '90%'}}
          id="outlined-svg-textField"
          label="Insert icon SVG"
          value={icon}
          onChange={handleIconUpdate}
        />
        </Box>
      </Box>

      <Box sx={{
        width: '40%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
        <Typography className={classes.preview}>Preview</Typography>
        {base64data ? ( <img style={{ width: '60px', height: '60px'}} src={`data:image/svg+xml;base64,${base64data}`} alt="" />) : null}
      </Box>
      </Box>
      </Fragment>
  )
};


export default IconSelect;