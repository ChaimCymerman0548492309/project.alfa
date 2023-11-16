import  { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm } from 'react-hook-form';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Popover from "@mui/material/Popover";

const SignUpModal = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [open, setOpen] = useState(false);
  const [messageAnchorEl, setMessageAnchorEl] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (data: any) => {
    const {
      user_id,
      username,
      password,
      name,
      email,
      address,
    } = data;

    setFormData(data);
    console.log(user_id, username, password, name, email, address);

    const dataToServerAddUser = {
      "user_id": user_id,
      "username": username,
      "password": password,
      "name": name,
      "email": email,
      "address": address,
      "cart": []
    };

    try {
      const response = await axios.post(
        "https://server-tpja.onrender.com/api/users/register",
        dataToServerAddUser
      );
      setMessageAnchorEl(document.body as any);
      console.log(response.data);
      // Save user data in local storage
      localStorage.setItem(`userData`, JSON.stringify(response.data.user));

      console.log("User data saved in localStorage:", response.data.user);
      navigate("/");

    } catch (error) {
      console.error("Error sending data to server:", error);
    }
  };

  const handleCloseMessage = () => {
    setMessageAnchorEl(null);
  };

  const openMessagePopover = Boolean(messageAnchorEl);
  const messageId = openMessagePopover ? 'simple-popover' : undefined;
  return (
    <div>
      <Button onClick={handleOpen} style={{ color: "white" }}>Sign Up</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <ThemeProvider theme={createTheme()}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* <Box component="div" sx={{ mt: 3 }}> Remove this line */}
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="given-name"
                        required
                        fullWidth
                        id="user_id"
                        label="User id"
                        autoFocus
                        {...register('user_id')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="given-name"
                        required
                        fullWidth
                        id="username"
                        label="User Name between 3 and 30 characters"
                        autoFocus
                        {...register('username')} // שימוש ב'username' כאן
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        label="Password minimum 5 characters"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        {...register('password')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        {...register('name')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        {...register('email')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="address"
                        label="Address"
                        {...register('address')}
                      />
                    </Grid>
                    {/* <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="cart"
                        label="Cart"
                        {...register('cart')}
                      />
                    </Grid> */}
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      {/* ... */}
                    </Grid>
                  </Grid>
                  {/* </Box> Remove this line */}
                </form>
                {/* Display form data */}
              </Box>
            </Container>
          </ThemeProvider>
        </Box>
      </Modal>
      <Popover
        id={messageId}
        open={openMessagePopover}
        anchorEl={messageAnchorEl}
        onClose={handleCloseMessage}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography sx={{ p: 2 }}>Success to Register</Typography>
      </Popover>
    </div>
  );
};

export default SignUpModal;
