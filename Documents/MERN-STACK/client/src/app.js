import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './view/Login/login'
import Home from './view/homepage/home'
import TopBar from './components/topbar/TopBar'
import { Context } from './context/ Context'
import Single from './view/single/Single'
import Write from './view/write/Write'
import Settings from './view/settings/Settings'
import Searchpage from './view/search/searchpage'
function App() {
	const { user } = useContext(Context)
	return (
		<BrowserRouter>
			<TopBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="create" element={user ? <Write /> : <Login />} />
				<Route path="/:postId" element={<Single />} />
				<Route path="/search" element={<Searchpage />} />
				<Route
					path="/settings"
					element={user ? <Settings /> : <Login />}
				/>
			</Routes>
		</BrowserRouter>
	)
}

export default App
