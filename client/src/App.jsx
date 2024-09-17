import React, { lazy, Suspense, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Box, createTheme, CssBaseline, Grid, Skeleton, ThemeProvider } from "@mui/material";
import Home from "./components/Home";
const Login = lazy(() => import('./components/Login'));
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
import Layout from "./components/Layout";

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
      element: <Layout><Home /></Layout>,
    },
    {
      path: "/login",
      element: <Layout><Suspense fallback={<Skeleton variant="rectangular" width={210} height={118}>
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
      </Skeleton>}>
        <Login />
      </Suspense></Layout>,
    },
    {
      path: "/signup",
      element: <Layout><SignUp /></Layout>,
    },
    {
      path: "/adminlog",
      element: <Layout><AdminLogin /></Layout>,
    },
    {
      path: "/feedback",
      element: <Layout><ProtectedRoute component={FeedBack} /></Layout>,
    },
    {
      path: "/feedback2",
      element: <Layout><ProtectedRoute component={Feedback2} /></Layout>,
    },
    {
      path: "/selectform",
      element: <Layout><ProtectedRoute component={SelectForm} /></Layout>,
    },
    {
      path: "/feedbackdata",
      element: <Layout><AdminProtectedRoute component={FeedBackData} /></Layout>,
    },
    {
      path: "/editfeedbackdata/:id",
      element: <Layout><AdminProtectedRoute component={AdminEditData} /></Layout>,
    },
    {
      path: "/viewfeedback/:id",
      element: <Layout><AdminProtectedRoute component={AdminViewFeedback} /></Layout>,
    },
    {
      path: "/logout",
      element: <Layout><ProtectedRoute component={Logout} /></Layout>,
    },
    {
      path: "/resentemailverify",
      element: <Layout><ResentEmail /></Layout>,
    },
    {
      path: "/verifyemail",
      element: <Layout><VerifyEmail /></Layout>,
    },
    {
      path: "/forgotpasswordlink",
      element: <Layout><ForgotPasswordLink /></Layout>,
    },
    {
      path: "/forgotpassword",
      element: <Layout><ForgotPassword /></Layout>,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
