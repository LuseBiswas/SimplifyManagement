import React, { useState } from "react";
import { Grid, Paper, Avatar, TextField, Button, Typography, InputAdornment, IconButton } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import validator from 'validator';
import { LockOpen, AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import axiosInstance from "../api/api";

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [dis, setDis] = useState(false);
  const [emailLabel, setEmailLabel] = useState("Email");
  const [emailInput, setEmail] = useState("");
  const [passInput, setPass] = useState("");
  const [cpassInput, setCpass] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowCPassword = () => setShowCPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => { event.preventDefault(); };

  const token = localStorage.getItem('id');
  if (token) {
    const data = new URLSearchParams({
      id: token
    });
    axiosInstance.post("api/auth/token", data)
      .then(() => { setRedirect(true); })
      .catch(err => { console.log(err); });
  }

  const handleSignup = () => {
    const email = emailInput;
    const pass = passInput;
    const cpass = cpassInput;
    setEmailError(false);
    setPassError(false);
    setDis(true);
    if (email.length === 0 || pass.length === 0 || cpass.length === 0) {
      setDis(false);
      return;
    }
    if (!validator.isEmail(email)) {
      setEmailError(true);
      setEmailLabel("Email Not Valid!");
      setDis(false);
      return;
    } else if (pass !== cpass) {
      setPassError(true);
      setDis(false);
      return;
    }
    const data = new URLSearchParams({
      'email': email,
      'password': pass
    });
    axiosInstance.post("api/auth/signup", data)
      .then(res => {
        const id = res.data.id;
        localStorage.setItem('id', id);
        setDis(false);
        setRedirect(true);
      })
      .catch((err) => {
        console.log(err.response);
        const status = err.response.status;
        if (status === 409) {
          setEmailError(true);
          setEmailLabel("Email Already in Use");
          setDis(false);
          return;
        }
        setDis(false);
      });
  };

  const paperStyle = { padding: 40, height: '75vh', width: 320, margin: '20px auto', borderRadius: 10 };
  const avatarStyle = { backgroundColor: "green", marginBottom: 20 };
  const btnStyle = { margin: '20px 0', backgroundColor: "orange", color: "white" };
  const inputStyle = { margin: '15px 0' };

  return (
    <div>
      {redirect && <Navigate to="/" replace={true} />}
      <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
        <Paper elevation={10} style={paperStyle}>
          <Grid container direction="column" alignItems="center">
            <Avatar style={avatarStyle}><LockOpen /></Avatar>
            <Typography variant="h4" gutterBottom style={{ color: "black" }}>Sign Up</Typography>
            <TextField
              value={emailInput}
              label={emailLabel}
              variant="outlined"
              fullWidth
              required
              type="email"
              placeholder="example@gmail.com"
              style={inputStyle}
              error={emailError}
              onChange={(e) => { setEmail(e.target.value); }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              value={passInput}
              label={passError ? "Passwords Didn't Match" : "Password"}
              variant="outlined"
              fullWidth
              required
              placeholder="Password"
              style={inputStyle}
              type={showPassword ? 'text' : 'password'}
              error={passError}
              onChange={(e) => { setPass(e.target.value); }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              value={cpassInput}
              label={passError ? "Passwords Didn't Match" : "Confirm Password"}
              variant="outlined"
              fullWidth
              required
              placeholder="Confirm Password"
              style={inputStyle}
              type={showCPassword ? 'text' : 'password'}
              error={passError}
              onChange={(e) => { setCpass(e.target.value); }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowCPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showCPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              fullWidth
              style={btnStyle}
              onClick={handleSignup}
              disabled={dis}
            >
              Sign Up
            </Button>
            <Typography style={{ marginTop: '20px', color: "black" }}>
              Already Have an Account? <Link to="/login" style={{ color: "green" }}>Sign In</Link>
            </Typography>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
}

export default RegisterPage;
