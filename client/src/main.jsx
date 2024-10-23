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
import ClaimPage from './pages/ClaimPage/ClaimPage.jsx';
// use context
import { GlobalStateProvider } from './components/GlobalState.jsx';
import FoundPage from './pages/FoundPage.jsx';
import AdminPage from './pages/AdminPage/AdminPage.jsx';
import ClaimRequest from './pages/ClaimRequest/claimRqst.jsx';
import FoundRequest from './pages/FoundRequest/foundrqst.jsx';



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
  {
    path: "/found",
    element: <FoundPage/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/claim",
    element: <ClaimPage/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: '/admin',
    element:<AdminPage/>,
    errorElement:<ErrorPage/>,
  },
  {
    path:'/claimrqst',
    element:<ClaimRequest/>,
    errorElement:<ErrorPage/>
  },
  {
    path:'/foundrqst',
    element:<FoundRequest/>,
    errorElement:<ErrorPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <GlobalStateProvider>

    
     <RouterProvider router={router} />

     
     </GlobalStateProvider>
  </React.StrictMode>,
)
