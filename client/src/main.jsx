import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import ErrorPage from './pages/ErrorPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage/SignupPage.jsx';
import SearchListPage from './pages/SearchListPage/SearchListPage.jsx';
import PostPage from './pages/PostPage/PostPage.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';
// use context
import { GlobalStateProvider } from './components/GlobalState.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/signup",
    element: <SignupPage/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/searchlist",
    element: <SearchListPage/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/post",
    element: <PostPage/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/profile",
    element: <ProfilePage/>,
    errorElement: <ErrorPage/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <GlobalStateProvider>

    
     <RouterProvider router={router} />

     
     </GlobalStateProvider>
  </React.StrictMode>,
)
