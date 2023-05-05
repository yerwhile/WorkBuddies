import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Welcome from "./Welcome";
import FormPack from "./pack/FormPack";
import PackDetails from "./pack/PackDetails";
import FindPack from "./pack/FindPack";
import { getBuddyDetails, getToken, me } from "../modules/authManager";

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
          <Route path="pack">
            <Route path="formPack" element={<FormPack />} />
            <Route path="packDetails/:id" element={<PackDetails />} />
            <Route path ="findPack" element={<FindPack />} />
          </Route>
          <Route path="*" element={<p>Whoops, nothing here...</p>} />
        </Route>
      </Routes>
    </main>
  );
};