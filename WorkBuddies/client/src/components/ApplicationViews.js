import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Welcome from "./Welcome";
import FormPack from "./pack/FormPack";
import PackDetails from "./pack/PackDetails";
import FindPack from "./pack/FindPack";
import Profile from "./profile/Profile";
import AddVibeForm from "./pack/AddVibeForm";
import CreateVibe from "./vibe/CreateVibe";
import AddHangoutForm from "./pack/AddHangoutForm";
import CreateHangout from "./hangout/CreateHangout";
import EditProfile from "./profile/EditProfile";

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
              <Route path="editProfile/:id" element={<EditProfile />} />
          </Route>
          <Route path="pack">
              <Route path="formPack/:id" element={<FormPack />} />
              <Route path="packDetails/:id" element={<PackDetails user={user}/>} />
              <Route path ="findPack" element={<FindPack user={user} />} />
              <Route path="editVibes/:id" element={<AddVibeForm />} />
              <Route path="editHangouts/:id" element={<AddHangoutForm />} />
          </Route>
          <Route path="vibe">
              <Route path="createVibe/:id" element={<CreateVibe />} />
          </Route>
          <Route path="hangout">
            <Route path="createHangout/:id" element={<CreateHangout />} />
          </Route>
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
};