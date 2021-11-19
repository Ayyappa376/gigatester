// import { Avatar, Button as MuiButton, Typography } from "@material-ui/core";
// import { grey } from "@material-ui/core/colors";
// import {
//   CloudUpload as MuiCloudUpload,
//   Delete as MuiDelete,
// } from "@material-ui/icons";
// import { spacing } from "@material-ui/system";
// import React, { createRef, useState } from "react";
// import styled from "styled-components";

// const Button = styled(MuiButton)(spacing);
// const UploadIcon = styled(MuiCloudUpload)(spacing);
// const DeleteIcon = styled(MuiDelete)(spacing);

// const CenteredContent = styled.div`
//   text-align: center;
// `;

// const BigAvatar = styled(Avatar)`
//   width: 120px;
//   height: 120px;
//   margin: 0 auto ${(props) => props.theme.spacing(2)}px;
//   ${({ $withBorder }) =>
//     $withBorder &&
//     `border: 1px solid ${grey[500]};
//      box-shadow: 0 0 1px 0 ${grey[500]} inset, 0 0 1px 0 ${grey[500]};`}
// `;

// const AvatarUpload = () => {
//   const [image, _setImage] = useState(null);
//   const inputFileRef = createRef(null);

//   const cleanup = () => {
//     URL.revokeObjectURL(image);
//     inputFileRef.current.value = null;
//   };

//   const setImage = (newImage) => {
//     if (image) {
//       cleanup();
//     }
//     _setImage(newImage);
//   };

//   const handleOnChange = (event) => {
//     const newImage = event.target?.files?.[0];

//     if (newImage) {
//       setImage(URL.createObjectURL(newImage));
//     }
//   };

//   /**
//    *
//    * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event
//    */
//   const handleClick = (event) => {
//     if (image) {
//       event.preventDefault();
//       setImage(null);
//     }
//   };

//   return (
//     <CenteredContent>
//       <BigAvatar
//         $withBorder
//         alt="Avatar"
//         src={image || "/static/img/avatars/default-profile.svg"}
//         imgProps={{
//           style: {
//             maxHeight: "100%",
//             maxWidth: "100%",
//             objectFit: "cover",
//           },
//         }}
//       />
//       <input
//         ref={inputFileRef}
//         accept="image/*"
//         hidden
//         id="avatar-image-upload"
//         type="file"
//         onChange={handleOnChange}
//       />
//       <label htmlFor="avatar-image-upload">
//         <Button
//           variant="contained"
//           color="primary"
//           component="span"
//           mb={2}
//           onClick={handleClick}
//         >
//           {image ? <DeleteIcon mr={2} /> : <UploadIcon mr={2} />}
//           {image ? "Limpar" : "Upload"}
//         </Button>
//       </label>
//       <Typography variant="caption" display="block" gutterBottom>
//         Para obter os melhores resultados, use uma imagem de pelo menos 128 x
//         128 pixels no formato .jpg
//       </Typography>
//     </CenteredContent>
//   );
// };

// export default AvatarUpload;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, InputLabel, Paper, Typography } from "@material-ui/core";
import "../style.css";

const useStyles = makeStyles(() => ({
  img: {
    height: 40,
    width: 40,
    borderRadius: "20%",
  },
  block: {
    padding: "10px 20px",
    borderLeft: "2px solid #000000",
  },
  subTitle: {
    fontSize: "12px",
    paddingTop: "2px",
  },
}));

const PlatformsView = (props: any) => {
  const classes = useStyles();
  return (
    <div data-testid="platform">
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Typography className="headerText" data-testid="header">
            Platforms
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            className="button buttonMarginLeftPane"
            data-testid="viewAllButton"
          >
            View All
          </Button>
        </Grid>
      </Grid>
      <Paper className="platformViewSection sectionBackground sectionBorder">
        <Grid container spacing={3}>
          {props.platformList &&
            props.platformList.map((item: any, index: number) => {
              return (
                <Grid item xs={12} sm={6} key={index}>
                  <Paper
                    className={classes.block}
                    data-testid={`platform-${item.id}`}
                  >
                    <Grid container spacing={4}>
                      <Grid item xs={3} sm={3} md={3}>
                        <img
                          className={classes.img}
                          src={item.imgPath}
                          alt={item.label}
                        />
                      </Grid>
                      <Grid item xs={9} sm={9} md={9}>
                        <Typography>{item.label}</Typography>
                        <InputLabel className={classes.subTitle}>
                          {item.label}
                        </InputLabel>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              );
            })}
        </Grid>
      </Paper>
    </div>
  );
};

export default PlatformsView;
