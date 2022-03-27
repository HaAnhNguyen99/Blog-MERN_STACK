import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { Outlet, Link } from 'react-router-dom'

export default function Login() {
	const [name, setName] = useState('')
	const [mk, setmk] = useState('')
	const [Response, setResponse] = useState([])

	async function Dangnhap(e) {
		e.preventDefault()
		try {
			await axios
				.post('login', {
					name,
					mk
				})
				.then((response) => {
					alert(response.data.message)
					localStorage.setItem('token', response.data.accesstoken)
				})
				.catch((error) => {
					console.log(error)
					setResponse({ message: 'Thông tin đăng nhập không đúng' })
				})
		} catch (exception) {
			console.log('dang o err', exception)
		}
	}

	return (
		<div className="container">
			<form onSubmit={Dangnhap}>
				<h1>Đăng nhập</h1>
				<label htmlFor="tdn">Tên đăng nhập:</label>
				<input
					htmlFor="tdn"
					type="text"
					style={{ marginBottom: '5px' }}
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Tên "
				></input>{' '}
				<br />
				<label htmlFor="mk">Mật khẩu:</label>
				<input
					htmlFor="mk"
					type="password"
					style={{ marginBottom: '5px' }}
					value={mk}
					onChange={(e) => setmk(e.target.value)}
					placeholder="Mật khẩu"
				></input>
				<br />
				<button type="submit" style={{ marginTop: '10px' }}>
					Đăng nhập
				</button>
			</form>
			<h3 style={{ color: 'red' }}>{Response.message}</h3>
		</div>
	)
}
// Link
{
	/* <Link to={`/users/${acc._id}`} activeClassName="active">
						{acc._id}
					</Link> */
}
