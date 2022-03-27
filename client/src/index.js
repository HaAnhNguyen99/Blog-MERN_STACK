import React from 'react'
import ReactDOM, { render } from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Login from './view/Login/login'
import Home from './view/homepage/home'
import Create from './view/createblog/create'
import axios from 'axios'
import App from './app'

//config axios
axios.defaults.baseURL = 'http://localhost:3000/'
// axios.defaults.headers.common['authorization'] =
// 	'Bearer ' + localStorage.getItem('token')
const rootElement = document.getElementById('root')

ReactDOM.render(
	<App />,
	rootElement
)
