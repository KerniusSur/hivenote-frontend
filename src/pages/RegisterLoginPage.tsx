import { Box, Typography } from "@mui/material";
import { Auth } from "api/Auth";
import { EmailPasswordLoginRequest, RegisterRequest } from "api/data-contracts";
import GoogleLogo from "assets/google-logo.svg";
import HiveButton from "components/HiveButton";
import HiveInput from "components/HiveInput";
import { Form, Formik } from "formik";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createApi } from "utils/api/ApiCreator";
import * as yup from "yup";

interface RegisterLoginPageProps {
  isRegisterPage?: boolean;
}

const RegisterLoginPage = (props: RegisterLoginPageProps) => {
  const authAPI = useRef(createApi("auth") as Auth);

  const handleSubmit = async (values: AuthFormValues) => {
    if (isRegisterPage) {
      if (!values.name || !values.lastName) {
        return;
      }

      const request: RegisterRequest = {
        email: values.email,
        password: values.password,
        name: values.name,
        lastName: values.lastName,
      };

      await authAPI.current.register(request);
      window.location.href = "/";
      return;
    }

    const request: EmailPasswordLoginRequest = {
      email: values.email,
      password: values.password,
    };
    await authAPI.current.login(request);
    window.location.href = "/";
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
          validationSchema={getValidationSchema(isRegisterPage)}
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
            {isRegisterPage && (
              <>
                <HiveInput
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                />
                <HiveInput name="name" placeholder="First Name" />
                <HiveInput name="lastName" placeholder="Last Name" />
              </>
            )}
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
  name?: string;
  confirmPassword?: string;
  lastName?: string;
}

const initialValues: AuthFormValues = {
  email: "",
  password: "",
  name: "",
  confirmPassword: "",
  lastName: "",
};

const getValidationSchema = (isRegisterPage?: boolean) => {
  if (isRegisterPage) {
    return yup.object({
      email: yup.string().email("Invalid email address").required("Required"),
      password: yup.string().required("Required"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match"),
      name: yup.string().required("Required"),
      lastName: yup.string().required("Required"),
    });
  }

  return yup.object({
    email: yup.string().email("Invalid email address").required("Required"),
    password: yup.string().required("Required"),
  });
};

export default RegisterLoginPage;
