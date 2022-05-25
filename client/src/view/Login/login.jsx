import axios from 'axios'
import React, { useRef, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/ Context'
import { useNavigate } from 'react-router-dom'
import './login.css'
export default function Login() {
	const [Response, setResponse] = useState([])
	const { dispatch } = useContext(Context)
	const userRef = useRef()
	const passwordRef = useRef()
	const navigate = useNavigate()
	async function Dangnhap(e) {
		e.preventDefault()
		try {
			const name = userRef.current.value
			const mk = passwordRef.current.value
			if (name !== '' && mk !== '') {
				await axios
					.post('login', {
						name,
						mk
					})
					.then((response) => {
						dispatch({ type: 'LOGIN', payload: response.data })
						navigate('/')
					})

					.catch((error) => {
						console.log(error)
						setResponse({
							message: 'Thông tin đăng nhập không đúng'
						})
					})
			} else {
				setResponse({ message: 'Không được bỏ trống thông tin' })
			}
		} catch (exception) {
			console.log(exception)
		}
	}

	return (
		<div className="container">
			<h1 className="loginTitle">Đăng nhập</h1>
			<form onSubmit={Dangnhap} className="loginForm">
				<label htmlFor="tdn">Tên đăng nhập:</label>
				<input
					htmlFor="tdn"
					type="text"
					className="loginInput"
					style={{ marginBottom: '5px' }}
					ref={userRef}
					placeholder="Tên..."
				/>
				<br />
				<label htmlFor="mk">Mật khẩu:</label>
				<input
					htmlFor="mk"
					type="password"
					className="loginInput"
					style={{ marginBottom: '5px' }}
					placeholder="Mật khẩu..."
					ref={passwordRef}
				/>
				<br />
				<button
					type="submit"
					style={{ marginTop: '10px' }}
					className="loginButton">
					Đăng nhập
					<Link className="link" to="/"></Link>
				</button>
			</form>
			<h3 style={{ color: 'red', marginTop: '10px' }}>{Response.message}</h3>
		</div>
	)
}
