import * as React from 'react';
import { TextField } from '@material-ui/core';

export default function SetNewPassword(props: any) {
  return (
    <React.Fragment>
      <TextField
        required
        margin="dense"
        fullWidth
        label="New Password"
        type="password"
        id="newPassword"
        {...props.bindNewPassword}
      />
      <TextField
        required
        margin="dense"
        fullWidth
        label="Confirm New Password"
        type="password"
        id="confirmNewpassword"
        {...props.bindConfirmNewPassword}
      />
    </React.Fragment>
  );
}
