import React, {useEffect, useState, useRef, Fragment} from 'react';
import {
	Grid,
	Typography,
	TextField,
	makeStyles,
	Box,
  Button,
  Tooltip,
} from '@material-ui/core';
import IconProgressBar from './IconProgressBar';
import { buttonStyle, tooltipTheme } from '../../../common/common';


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
  iconStr: string;
//  product: any;
  handleIconChange: Function;
}


const IconSelect = ({ iconType, iconStr, /*product, */handleIconChange }: IconProps) => {
  const [icon, setIcon] = useState('');
  const [base64data, setBase64] = useState<string | undefined>();
  const classes = useStyles();

  useEffect(() => {
    if(iconStr){
        const returnedIcon = iconStr.replace(/\<\?xml.+\?\>|\<\!DOCTYPE.+]\>/g, '');
        convertSVG(returnedIcon);
        setIcon(returnedIcon)
      } else {
        setIcon('')
      }
    // }
  // }, [product])
    }, [iconStr]);

  const convertSVG = (icon: string) => {
    const buff = Buffer.from(icon);
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
    reader.onerror = function (event) {
      console.log('error uploading svg file', event);
      reader.abort();
    }
    reader.readAsText(file);
  }



  return (
    <React.Fragment>
      <Typography className={classes.iconTitle}>Icon:</Typography>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      }}>
        <Box sx={{
          width: '80%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
          <Box sx={{ marginTop: '10px'}}>
            <input type="file" id={`svg-${iconType}-upload`} accept='image/svg+xml' onChange={e => handleChange(e)} style={{ display: 'none'}}></input>
            <label htmlFor={`svg-${iconType}-upload`}>
              <Tooltip title="svg+xml files only" arrow>
                <Button className={classes.uploadBtn} variant="contained" component="span">Upload</Button>
              </Tooltip>
            </label>
          </Box>

          <Box sx={{
            width: '100%',
            height: '90%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
            <Typography style={{ margin: '20px 10px 5px 10px' }}>or</Typography>
            {/* <IconProgressBar /> */}
            <TextField
              multiline
              rows={6}
              style={{ width: '100%', padding: '0', margin: '0'}}
              id="outlined-svg-textField"
              label="Insert icon SVG"
              value={icon}
              onChange={handleIconUpdate}
              variant="outlined"
            />
          </Box>
        </Box>

        <Box sx={{
          width: '20%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
          <Typography className={classes.preview}>Preview</Typography>
          {base64data ? ( <img style={{ width: '50px', height: '50px'}} src={`data:image/svg+xml;base64,${base64data}`} alt="" />) : null}
        </Box>
      </Box>
    </React.Fragment>
  )
};


export default IconSelect;