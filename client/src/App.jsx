import React, { lazy, Suspense, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Box, createTheme, CssBaseline, Grid, Skeleton, ThemeProvider } from "@mui/material";
import Home from "./components/Home";
const Login = lazy(() => import('./components/Login'))
import SignUp from "./components/SignUp";
import AdminLogin from "./components/AdminLogin";
import FeedBack from "./components/FeedBack";
import ProtectedRoute from "./components/ProtectedRoute";
import FeedBackData from "./components/FeedBackData";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminEditData from "./components/AdminEditData";
import AdminViewFeedback from "./components/AdminViewFeedback";
import Logout from "./components/Logout";
import SelectForm from "./components/SelectForm";
import Feedback2 from "./components/Feedback2";
import ResentEmail from "./components/ResentEmail";
import VerifyEmail from "./components/VerifyMail";
import ForgotPasswordLink from "./components/forgotpassword/ForgotPasswordLink";
import ForgotPassword from "./components/forgotpassword/ForgotPassword";
import { Form } from 'formik';


function App() {
  const [mode, setMode] = useState("light");

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {

      path: "/login",
      element: <Suspense fallback={

        <Skeleton variant="rectangular" width={210} height={118} >


          <Skeleton variant="circular" width={40} height={40} />


          <Skeleton width={100} />


       

            <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />


            <Skeleton variant="rectangular" height={56} sx={{ mb: 2 }} />

            <Grid container>
              <Grid item xs>
                <Skeleton width={100} />
              </Grid>
            </Grid>

            <Skeleton variant="rectangular" height={36} sx={{ mt: 3, mb: 2 }} />

            <Grid container>
              <Grid item xs>
                <Skeleton width={150} />
              </Grid>
              <Grid item>
                <Skeleton width={200} />
              </Grid>
            </Grid>
        



        </Skeleton>
      }>
        <Login />
      </Suspense>,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/adminlog",
      element: <AdminLogin />,
    },
    {
      path: "/feedback",
      element: <ProtectedRoute component={FeedBack} />,
    },
    {
      path: "/feedback2",
      element: <ProtectedRoute component={Feedback2} />,
    },
    {
      path: "/selectform",
      element: <ProtectedRoute component={SelectForm} />,
    },
    {
      path: "/feedbackdata",
      element: <AdminProtectedRoute component={FeedBackData} />,
    },
    {
      path: "/editfeedbackdata/:id",
      element: <AdminProtectedRoute component={AdminEditData} />,
    },
    {
      path: "/viewfeedback/:id",
      element: <AdminProtectedRoute component={AdminViewFeedback} />,
    },
    {
      path: "/logout",
      element: <ProtectedRoute component={Logout} />,
    },
    {
      path: "/resentemailverify",
      // element: <ProtectedRoute component={ResentEmail} />,
      element: <ResentEmail />,
    },
    {
      path: "/verifyemail",
      // element: <ProtectedRoute component={ResentEmail} />,
      element: <VerifyEmail />,
    },
    {
      path: "/forgotpasswordlink",
      // element: <ProtectedRoute component={ResentEmail} />,
      element: <ForgotPasswordLink />,
    },
    {
      path: "/forgotpassword",
      // element: <ProtectedRoute component={ResentEmail} />,
      element: <ForgotPassword />,
    },
  ]);
  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />
      <RouterProvider router={router} />
      {/* <Home toggleColorMode={toggleColorMode} /> */}
    </ThemeProvider>
  );
}

export default App;
