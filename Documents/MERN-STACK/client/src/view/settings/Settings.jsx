import './settings.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { useContext, useState } from 'react'
import { Context } from '../../context/ Context'
import axios from 'axios'

export default function Settings() {
	const [file, setFile] = useState(null)
	const [pass1, setPass1] = useState('')
	const [password, setPassword] = useState('')
	const [success, setSuccess] = useState(null)
	const { user, dispatch } = useContext(Context)
	const PF = 'http://localhost:3000/images/'
	const token = localStorage.getItem('token')
	let config = {
		headers: {
			Authorization: 'Bearer ' + token
		}
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (password === pass1) {
			const updatedUser = {
				userId: user.userId,
				password,
				accesstoken: token
			}
			if (file) {
				const data = new FormData()
				const filename = Date.now() + file.name
				data.append('name', filename)
				data.append('file', file)
				updatedUser.profilePic = filename
				try {
					await axios.post('/upload', data)
				} catch (err) {
					console.log(err)
				}
			}
			try {
				await axios
					.put('/account/update/' + user.userId, updatedUser, config)
					.then((response) => {
						setSuccess(true)
						dispatch({
							type: 'UPDATE_SUCCESS',
							payload: response.data
						})
					})
			} catch (err) {
				console.log(err)
			}
		} else {
			setSuccess(false)
		}
	}
	return (
		<div className="settings">
			<div className="settingsWrapper">
				<div className="settingsTitle">
					<span className="settingsUpdateTitle">
						Update Your Account
					</span>
				</div>
				<form className="settingsForm" onSubmit={handleSubmit}>
					<label>Profile Picture</label>
					<div className="settingsPP">
						<img
							src={
								file
									? URL.createObjectURL(file)
									: PF + user.profilePic
							}
							alt=""
						/>
						<label htmlFor="fileInput">
							<i className="settingsPPIcon far fa-user-circle"></i>
						</label>
						<input
							type="file"
							id="fileInput"
							style={{ display: 'none' }}
							onChange={(e) => {
								setFile(e.target.files[0])
							}}
						/>
					</div>
					<label>Password</label>
					<input
						type="password"
						placeholder={user.account}
						onChange={(e) => {
							setPass1(e.target.value)
						}}
						required
					/>

					<label>Confirm Password</label>
					<input
						type="password"
						required
						onChange={(e) => {
							setPassword(e.target.value)
						}}
					/>
					<button className="settingsSubmit" type="submit">
						Update
					</button>
					{success && (
						<span
							style={{
								color: 'green',
								textAlign: 'center',
								marginTop: '20px'
							}}>
							Profile has been updated...
						</span>
					)}
					{success == false && (
						<span
							style={{
								color: 'red',
								textAlign: 'center',
								marginTop: '20px'
							}}>
							Please check your information again...
						</span>
					)}
				</form>
			</div>
			<Sidebar />
		</div>
	)
}
