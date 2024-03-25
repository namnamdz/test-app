// THIRD-PARTY
import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import * as yup from "yup";

//PROJECT-IMPORT
import { isEmail } from "helper";
import useAuth from "hooks/useAuth";
import { LoginType } from "types/user";
import { useIntl } from "react-intl";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const Login = () => {
  const { login } = useAuth();
  const intl = useIntl();
  const validationSchema = yup.object({
    userName: yup
      .string()
      .required("Email is required!")
      .test("is-email", "Invalid email format", isEmail),
    password: yup
      .string()
      .required("Email is required!")
      .min(8, "Password must be at least 8 characters.")
      .max(32, "Password must be at most 32 characters."),
  });
  const initialValues: LoginType = {
    userName: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async () => {
      await handleSubmit();
      formik.resetForm();
    },
  });
  const handleSubmit = async () => {
    await login(formik.values.userName, formik.values.password);
  };
  return (
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
          {intl.formatMessage({ id: "sign-in" })}
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label={intl.formatMessage({ id: "email" })}
            name="userName"
            autoComplete="userName"
            onChange={formik.handleChange}
            value={formik.values.userName}
            onBlur={formik.handleBlur}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {intl.formatMessage({ id: "sign-in" })}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Login;
