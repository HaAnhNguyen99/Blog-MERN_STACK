import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../context/ Context'
import './singlePost.css'

export default function SinglePost() {
	const path = window.location.pathname.split('/')[1]
	const PF = 'http://localhost:3000/images/'
	const [post, setPost] = useState({})
	const { user } = useContext(Context)
	const [title, setTitle] = useState('')
	const [content, setcontent] = useState('')
	const [updateMode, setUpdateMode] = useState(false)

	const token = localStorage.getItem('token')
	let config = {
		headers: {
			Authorization: 'Bearer ' + token
		}
	}
	useEffect(() => {
		const getPost = async () => {
			const res = await axios.get('blog/' + path)
			setPost(res.data)
			setTitle(res.data.title)
			setcontent(res.data.content)
		}
		getPost()
	}, [])

	const handleDelete = async () => {
		try {
			await axios.delete(`/blog/delete/${post._id}`, config)
			window.location.replace('/')
		} catch (err) {
			console.log(err)
		}
	}

	const handleUpdate = async () => {
		try {
			await axios
				.put(
					`/blog/update/${post._id}`,
					{
						author: user.user,
						title,
						content
					},
					config
				)
				.catch((err) => console.log(err))
			setUpdateMode(true)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className="singlePost">
			<div className="singlePostWrapper">
				{post.img && (
					<img src={PF + post.img} alt="" className="singlePostImg" />
				)}
				{updateMode ? (
					<input
						type="text"
						value={title}
						className="singlePostTitleInput"
						onChange={(e) => setTitle(e.target.value)}
					/>
				) : (
					<h1 className="singlePostTitle">
						{title}
						{post.author === user?.user && (
							<div className="singlePostEdit">
								<i
									className="singlePostIcon far fa-edit"
									onClick={() => setUpdateMode(true)}></i>
								<i
									className="singlePostIcon far fa-trash-alt"
									onClick={handleDelete}></i>
							</div>
						)}
					</h1>
				)}
				<div className="singlePostInfo">
					<span className="singlePostAuthor">
						Author:
						<Link to={`/?user=${post.author}`} className="link">
							<b> {post.author}</b>
						</Link>
					</span>
					<span className="singlePostDate">
						{new Date(post.createdAt).toDateString() ||
							new Date(post.date).toDateString()}
					</span>
				</div>
				{updateMode ? (
					<textarea
						className="singlePostcontentInput"
						value={content}
						onChange={(e) => setcontent(e.target.value)}
					/>
				) : (
					<p className="singlePostDesc">{content}</p>
				)}
				{updateMode && (
					<button className="singlePostButton" onClick={handleUpdate}>
						Update
					</button>
				)}
			</div>
		</div>
	)
}
