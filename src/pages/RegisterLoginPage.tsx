import { Box, Typography } from "@mui/material";
import { Auth } from "api/Auth";
import { EmailPasswordLoginRequest } from "api/data-contracts";
import GoogleLogo from "assets/google-logo.svg";
import HiveButton from "components/HiveButton";
import HiveInput from "components/HiveInput";
import { Form, Formik } from "formik";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createApi } from "utils/ApiCreator";
import * as yup from "yup";

interface RegisterLoginPageProps {
  isRegisterPage?: boolean;
}

const RegisterLoginPage = (props: RegisterLoginPageProps) => {
  const authAPI = useRef(createApi("auth") as Auth);

  const handleSubmit = async (values: AuthFormValues) => {
    const request: EmailPasswordLoginRequest = {
      email: values.email,
      password: values.password,
    };
    if (isRegisterPage) {
      await authAPI.current.register(request);
      navigate("/");
      return;
    }

    await authAPI.current.login(request);
    navigate("/");
  };

  const { isRegisterPage } = props;
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        padding: "64px 0px 96px 0px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          gap: "32px",
          maxWidth: "500px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",

              justifyContent: "center",
              width: "50%",
              padding: "12px 24px",
              borderBottom: isRegisterPage
                ? "1px solid transparent"
                : "1px solid #000000",
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
            }}
            onClick={() => {
              navigate("/login");
            }}
          >
            <Typography
              variant="body3"
              align="center"
              sx={{
                color: !isRegisterPage ? "#000000" : "#505050",
              }}
            >
              Log in
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "50%",
              padding: "12px 24px",
              cursor: "pointer",
              borderBottom: isRegisterPage
                ? "1px solid #000000"
                : "1px solid transparent",
              transition: "all 0.3s ease-in-out",
            }}
            onClick={() => {
              navigate("/register");
            }}
          >
            <Typography
              variant="body3"
              align="center"
              sx={{
                color: isRegisterPage ? "#000000" : "#505050",
              }}
            >
              Sign up
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            paddingTop: "48px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            width: "100%",
          }}
        >
          <Typography variant="h2" align="center">
            {isRegisterPage ? "Sign up" : "Log in"}
          </Typography>
          <Typography variant="body1" align="center">
            Lorem ipsum dolor sit amet adipiscing elit.
          </Typography>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            handleSubmit(values);
          }}
        >
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              width: "100%",
            }}
          >
            <HiveInput name="email" placeholder="Email" />
            <HiveInput name="password" type="password" placeholder="Password" />
            <HiveButton
              variant="contained"
              text={isRegisterPage ? "Sign up" : "Log in"}
              type="submit"
            />
            <HiveButton
              variant="outlined"
              text={
                isRegisterPage ? "Sign up with Google" : "Log in with Google"
              }
              startIcon={<img src={GoogleLogo as any} alt="Google" />}
            />
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

interface AuthFormValues {
  email: string;
  password: string;
}

const initialValues: AuthFormValues = {
  email: "",
  password: "",
};

const validationSchema = yup.object({
  email: yup.string().email("Invalid email address").required("Required"),
  password: yup.string().required("Required"),
});

export default RegisterLoginPage;
