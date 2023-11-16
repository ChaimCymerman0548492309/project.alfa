import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Popover from "@mui/material/Popover";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [submitClicked, setSubmitClicked] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    setFormData(data);

    try {
      const response = await axios.post(
        "https://server-tpja.onrender.com/api/users/login",
        data
      );

      if (response.data.error) {
        // Open the popover with the error message
        setAnchorEl(document.body);
      } else {
        // Close the popover
        setAnchorEl(null);

        // Save user data in local storage
        localStorage.setItem(`userData`, JSON.stringify(response.data.user));

        console.log("User data saved in localStorage:", response.data.user);
        navigate("/");

      }
    } catch (error) {
      console.error("Error sending data to server:", error);
      // Open the popover with the error message
      setAnchorEl(document.body);
    } finally {
      // Set the state to true after the submit attempt
      setSubmitClicked(true);
    }
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? "simple-popover" : undefined;

  return (
    <div>
      {submitClicked && (
        <div>
          {/* Render your component or redirect logic here */}
        </div>
      )}

      <div>
      <Button
  color="inherit"
  onClick={handleOpen}
  style={{
    marginLeft: "16px",
    marginRight: "10px",

    background: "linear-gradient(to bottom, #4CAF50, #45A049)",
    color: "white",
    borderRadius: "5px",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    transition: "background 0.3s ease",
  }}
>
  Login
</Button>

      
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <ThemeProvider theme={createTheme()}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    login
                  </Typography>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Box component="div" sx={{ mt: 3 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoComplete="email"
                            type="email"
                            {...register("email")}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            {...register("password")}
                          />
                        </Grid>
                      </Grid>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        login
                      </Button>
                      <Grid container justifyContent="flex-end">
                        <Grid item>
                          <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => {
                              onSubmit(formData);
                              // navigate("/");
                            }}
                          >
                            Home
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </form>
                </Box>
              </Container>
            </ThemeProvider>
          </Box>
        </Modal>
      </div>

      <Popover
        id={id}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography sx={{ p: 2 }}>Invalid email or password</Typography>
      </Popover>
    </div>
  );
};

export default Login;
