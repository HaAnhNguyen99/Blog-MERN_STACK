import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './view/Login/login'
import Home from './view/homepage/home'
import Create from './view/createblog/create'
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="create" element={<Create />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
