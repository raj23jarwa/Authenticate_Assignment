import React from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';

// import App from './App.jsx'
import Home from './components/Home.jsx';
import { RouterProvider ,createBrowserRouter, createRoutesFromElements,Route} from 'react-router-dom';
import Layout from './Layout.jsx';

import './index.css'
import { Provider } from 'react-redux'
import { store } from './features/store.js'
import WatchList from './components/WatchList.jsx';
import {PersistGate} from "redux-persist/integration/react"
// import {PersistStore} from "redux-persist"
import persistStore from 'redux-persist/es/persistStore';
import MovieDetail from './components/MovieDetail.jsx';
// let root= createRoot(container);
let persistor =persistStore(store);
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element ={<Layout/>}>
      <Route path='/' element ={<Home />}/>
      <Route path='/home' element ={<Home />}/>
      <Route path='/watchlist' element={<WatchList/>}/>
      <Route path='/movie/:imdbID' element={<MovieDetail/>}/>
      
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
    <Auth0Provider
    domain="dev-k5zurwllm6ysg3vf.us.auth0.com"
    clientId="qk1eqvY3msB2nDxlUNyFLUxApalrbs8Q"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <Provider store={store}>
      <PersistGate persistor={persistor}>

      </PersistGate>

    {/* <App /> */}
    <RouterProvider router={router}/>

    </Provider>
    </Auth0Provider>
)
