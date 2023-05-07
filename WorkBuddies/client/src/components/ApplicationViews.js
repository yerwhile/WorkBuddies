import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Welcome from "./Welcome";
import FormPack from "./pack/FormPack";
import PackDetails from "./pack/PackDetails";
import FindPack from "./pack/FindPack";
import Profile from "./profile/Profile";

export default function ApplicationViews({ isLoggedIn, user }) {


  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <Welcome /> : <Navigate to="/login" />}
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="buddy">
              <Route path="profile/:id" element={<Profile user={user}/>}/>
          </Route>
          <Route path="pack">
              <Route path="formPack" element={<FormPack />} />
              <Route path="packDetails/:id" element={<PackDetails user={user}/>} />
              <Route path ="findPack" element={<FindPack user={user} />} />
          </Route>
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
};