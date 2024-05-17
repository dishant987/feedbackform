import React, { useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Home from "./components/Home";
import Login from "./components/Login";
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


function App() {
  const [mode, setMode] = useState("light");

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };
  console.log(mode);
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      props: { toggleColorMode },
    },
    {
      path: "/login",
      element: <Login />,
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
