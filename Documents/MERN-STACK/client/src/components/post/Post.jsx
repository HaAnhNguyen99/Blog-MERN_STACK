import './post.css'
import { Link } from 'react-router-dom'

export default function Post({ post }) {
	const PF = 'http://localhost:3000/images/' // sẽ lấy hình ảnh bài post từ back end đến client
	return (
		<div className="post">
			{post.img && (
				<Link to={`/${post._id}`} className="linkimg">
					<img className="postImg" src={PF + post.img} alt="" />
				</Link>
			)}
			<div className="postInfo">
				<div className="postCats">
					{post.categories.map((c) => (
						<span className="postCat">{c.name}</span>
					))}
				</div>
				<Link to={`/${post._id}`} className="link">
					<span className="postTitle">{post.title}</span>
				</Link>
				<hr />
				<span className="postDate">
					{new Date(post.createdAt || post.date).toDateString()}
				</span>
			</div>
			<p className="postContent">{post.content}</p>
		</div>
	)
}
