import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Profile from "./pages/Profile";
import ProfileUpdate from "./pages/ProfileUpdate";
import Post from "./pages/Post";
import EditPost from "./pages/EditPost";
import Resource from "./components/Resource/Resource";
import CreateArticleForm from "./components/Resource/Article/CreateArticleForm";
import AllStartup from "./pages/AllStartup";
import Startup from "./pages/Startup";
import AddStartup from "./pages/AddStartup";
import EventPage from "./pages/EventPage";
import EventDetaills from "./components/Event/EventDetails";
import EditStartup from './pages/EditStartup';
import EditArticle from "./components/Resource/EditArticle/EditArticle";
import MyNetwork from "./components/MyNetwork/MyNetwork";
import OthersProfile from "./pages/OthersProfile";

const RoutesConfig = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/update"
          element={
            <ProtectedRoute>
              <ProfileUpdate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/:slug"
          element={
            <ProtectedRoute>
              <Post />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-post/:slug"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/startups"
          element={
            <ProtectedRoute>
              <AllStartup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-startup"
          element={
            <ProtectedRoute>
              <AddStartup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/startups/:slug"
          element={
            <ProtectedRoute>
              <Startup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-startup/:slug"
          element={
            <ProtectedRoute>
              <EditStartup />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/resources" element={<Resource />} />
        <Route path="/create-article" element={<CreateArticleForm />} />
        <Route path="/edit-article/:slug" element={<EditArticle />} />
        <Route path="/my-networks" element={<MyNetwork />} />
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <EventPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events/:title"
          element={
            <ProtectedRoute>
              <EventDetaills />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile/:slug"
          element={
            <ProtectedRoute>
              <OthersProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default RoutesConfig;
