import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/SignUp.jsx";
import Layout from "./components/general-components/Layout.jsx";
import "./App.css";
import PopupLayout from "./components/popup-info-component/PopupLayout.jsx";
import BlurrBackground from "./components/general-components/BlurrBackground.jsx";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout>
              <Signup />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <Layout>
              <Profile />
            </Layout>
          }
        />
      </Routes>
      {/* <div>
        <Layout>
          <Home></Home>
          <Login></Login>
          <Profile></Profile>
        </Layout>
      </div> */}
    </>
  );
}

export default App;
