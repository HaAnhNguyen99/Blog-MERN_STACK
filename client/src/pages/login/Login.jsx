import axios from 'axios'
import { useState, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
import './login.css'

export default function Login() {
	const userRef = useRef()
	const passwordRef = useRef()
	const { dispatch, isFetching } = useContext(Context)
	const [error, setError] = useState(false)
	const handleSubmit = async (e) => {
		e.preventDefault()
		dispatch({ type: 'LOGIN_START' })
		try {
			const res = await axios.post('/auth/login', {
				username: userRef.current.value,
				password: passwordRef.current.value
			})
			dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
			// alert('Login successful')
		} catch (err) {
			setError(true)
			alert('Sai thông tin đăng nhập. Vui lòng kiểm tra lại')
		}
	}

	return (
		<div className="login">
			<span className="loginTitle">Login</span>
			<form className="loginForm" onSubmit={handleSubmit}>
				<label>Username</label>
				<input
					type="text"
					className="loginInput"
					placeholder="Enter your username..."
					ref={userRef}
				/>
				<label>Password</label>
				<input
					type="password"
					className="loginInput"
					placeholder="Enter your password..."
					ref={passwordRef}
				/>
				<button
					className="loginButton"
					type="submit"
					disabled={isFetching}>
					Login
				</button>
			</form>
			<button className="loginRegisterButton">
				<Link className="link" to="/register">
					Register
				</Link>
			</button>
			{error && (
				<span
					style={{
						color: 'red',
						marginTop: '20px',
						fontfamily: 'Josefin Sans'
					}}>
					Thông tin đăng nhập không chính xác vui lòng kiểm tra lại!
				</span>
			)}
		</div>
	)
}
