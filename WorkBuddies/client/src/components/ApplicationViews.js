import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Welcome from "./Welcome";
import FormPack from "./pack/FormPack";
import PackDetails from "./pack/PackDetails";
import FindPack from "./pack/FindPack";
import Profile from "./profile/Profile";
import AddVibeToPackForm from "./pack/AddVibeToPackForm";
import AddHangoutForm from "./pack/AddHangoutForm";
import CreateHangout from "./hangout/CreateHangout";
import EditProfile from "./profile/EditProfile";
import FindByVibe from "./vibe/FindByVibe";
import EditPack from "./pack/EditPack";
import HangoutDetails from "./hangout/HangoutDetails";
import CreateVibeFromPack from "./vibe/CreateVibeFromPack";
import AddVibeToHangoutForm from "./hangout/AddVibeToHangoutForm";
import EditHangout from "./hangout/EditHangout";

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
              <Route path="findPack" element={<FindPack user={user} />} />
              <Route path="editPack/:id" element={<EditPack />} />
              <Route path="editPackVibes/:id" element={<AddVibeToPackForm />} />
              <Route path="editHangouts/:id" element={<AddHangoutForm />} />
          </Route>
          <Route path="vibe">
              <Route path="createPackVibe/:id" element={<CreateVibeFromPack />} />
              <Route path="findByVibe" element={<FindByVibe user={user} />} />
          </Route>
          <Route path="hangout">
            <Route path="createHangoutVibe/:id" element={<CreateVibeFromPack />} />
            <Route path="hangoutDetails/:id" element={<HangoutDetails />} />
            <Route path="createHangout/:id" element={<CreateHangout />} />
            <Route path="editHangout/:id" element={<EditHangout />} />
            <Route path="editHangoutVibes/:id" element={<AddVibeToHangoutForm /> } />
          </Route>
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
};