import * as React from 'react';
import { TextField, Typography } from '@material-ui/core';

export default function SetNewPassword(props: any) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {props.forgotPassword ? 'Reset Password' : 'Change Password'}
      </Typography>
      <Typography variant="subtitle1">
        {props.forgotPassword ? 'We have sent a password reset code by email. Enter it below to reset your password'
         : props.changePasswordState ? 'Enter your current password and the new password below'
         : 'Enter your new password below'}
      </Typography>
      <br />
      {props.forgotPassword &&
        <TextField
          required
          margin="dense"
          fullWidth
          label="Verification Code"
          type="string"
          id="verificationCode"
          {...props.bindVerificationCode}
        />
      }
      {props.changePasswordState &&
        <TextField
        required
        margin="dense"
        fullWidth
        label="Current Password"
        type="string"
        id="oldPassword"
        {...props.bindOldPassword}
      />
    }
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
