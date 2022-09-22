import { React, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Profile from "./components/Profile";
import Login from "./components/Login";
import RequireAuth from "./components/RequireAuth";
import { RequireToken } from "./components/RequireAuth";
import Navigation from "./components/Navbar";
import UserList from "./components/UserList";
import SingleUser from "./components/UserList/SingleUser";
import DocView from "./components/SingleDoc/DocView";
import DocManagement from "./components/DocManagement";
import { useSelector } from "react-redux";
import Footer from "./components/Footer";
import ForgotPass from "./components/ForgotPass";
import ChangePassword from "./components/ChangePass";
import AboutUs from "./components/AboutUs";

function App() {
  const [navbar, setNavbar] = useState(false);
  const docs = useSelector((state) => state.loggedInUser.receivedDocs);
  return (
    <div className="bg-koyu">
      <div className="container">
        <div className="row">
          <Navigation navbar={navbar} setNavbar={setNavbar} />
        </div>
        <div
          onClick={() => setNavbar(false)}
          className=" row -mt-[98px] lg:pt-[75px]"
        >
          {/*   <Col
          lg={2}
          className="bg-koyu drop-shadow-[0_5px_5px_rgba(255,255,255,0.25)] d-lg-block d-none m-0 p-0 sidebar"
        >
          <Sidebar />
        </Col> */}
          <div className="col">
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route path="/forgotpassword" element={<ForgotPass />} />

              <Route
                path="/password-reset/:token"
                element={
                  <RequireToken redirectTo={"/login"}>
                    <ChangePassword />
                  </RequireToken>
                }
              />

              <Route
                path="/"
                element={
                  <RequireAuth redirectTo={"/login"}>
                    <DocManagement />
                  </RequireAuth>
                }
              />
              <Route
                path="/profile"
                element={
                  <RequireAuth redirectTo={"/login"}>
                    <Profile />
                  </RequireAuth>
                }
              />
              <Route
                path="/doc/upload/:name"
                element={
                  <RequireAuth redirectTo={"/login"}>
                    <DocView docs={docs} />
                  </RequireAuth>
                }
              />
              <Route
                path="/users"
                element={
                  <RequireAuth redirectTo={"/login"}>
                    <UserList />
                  </RequireAuth>
                }
              />
              <Route
                path="/users/:id"
                element={
                  <RequireAuth redirectTo={"/login"}>
                    <SingleUser />
                  </RequireAuth>
                }
              />
              <Route
                path="/aboutus"
                element={
                  <RequireAuth redirectTo={"/login"}>
                    <AboutUs />
                  </RequireAuth>
                }
              />

              <Route path="*" element={<h1>404 page not found</h1>} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
