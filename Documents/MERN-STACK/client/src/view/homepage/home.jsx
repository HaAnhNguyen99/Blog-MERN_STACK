import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../../components/header/Header'
import Sidebar from '../../components/sidebar/Sidebar'
import Posts from '../../components/posts/Posts'
import './home.css'

function Home() {
	const [resp, setresp] = useState([])
	useEffect(() => {
		const getposts = async () => {
			await axios
				.get(`blog`)
				.then((res) => {
					setresp(res.data) // set resp = res.data
				})
				.catch((error) =>
					console.error(error, console.log('Get data failed!!! '))
				)
		}
		getposts()
	}, [])
	return (
		<>
			<Header />
			<div className="home">
				<Posts posts={resp} />
				<Sidebar />
			</div>
		</>
	)
}

export default Home
