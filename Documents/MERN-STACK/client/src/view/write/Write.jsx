import { useContext, useState } from 'react'
import './write.css'
import axios from 'axios'
import { Context } from '../../context/ Context'

export default function Write() {
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [file, setFile] = useState(null)
	const { user } = useContext(Context)
	const token = localStorage.getItem('token')
	let config = {
		headers: {
			Authorization: 'Bearer ' + token
		}
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		const newPost = {
			author: user.user,
			title,
			content,
			img: null
		}
		if (file) {
			const data = new FormData()
			const name = Date.now() + file.name
			// config
			data.append('name', name)
			data.append('file', file)
			newPost.img = name
			try {
				await axios
					.post('/upload', data)
					.then(() => {
						console.log('success')
					})
					.catch((err) => {
						console.log(err)
					})
			} catch (err) {
				console.log(err)
			}
		}
		try {
			const res = await axios.post('/blog/new', newPost, config)
			window.location.replace('/' + res.data._id)
		} catch (err) {
			console.log('Không ổn rồi đại vương ơi!!!', err)
		}
	}
	return (
		<div className="write">
			{file && (
				<img
					className="writeImg"
					src={URL.createObjectURL(file)}
					alt=""
				/>
				
			)}
			<form className="writeForm" onSubmit={handleSubmit}>
				<div className="writeFormGroup">
					<label htmlFor="fileInput">
						<i className="writeIcon fas fa-plus"></i>
					</label>
					<input
						type="file"
						id="fileInput"
						style={{ display: 'none' }}
						onChange={(e) => setFile(e.target.files[0])}
					/>
					<input
						type="text"
						placeholder="Title"
						className="writeInput"
						autoFocus={true}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="writeFormGroup">
					<textarea
						placeholder="Tell your story..."
						type="text"
						className="writeInput writeText"
						onChange={(e) => setContent(e.target.value)}></textarea>
				</div>
				<button className="writeSubmit" type="submit">
					Publish
				</button>
			</form>
		</div>
	)
}
