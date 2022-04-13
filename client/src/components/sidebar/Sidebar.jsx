import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'

export default function Sidebar() {
	const [cats, setCats] = useState([])

	useEffect(() => {
		const getCats = async () => {
			await axios.get('cat/').then((res) => {
				setCats(res.data)
			})
		}
		getCats()
	}, [])
	return (
		<div className="sidebar">
			<div className="sidebarItem">
				<span className="sidebarTitle">ABOUT ME</span>
				<img src="http://localhost:3000/images/cat-update.png" alt="" />
				<p className="quote">
					The only constant in the technology industry is change.
				</p>
			</div>
			<div className="sidebarItem">
				<span className="sidebarTitle">CATEGORIES</span>
				<ul className="sidebarList">
					{cats.map((c) => (
						<Link
							to={`/?cat=${c._id}`}
							className="link"
							key={c._id}>
							<li className="sidebarListItem">{c.name}</li>
						</Link>
					))}
				</ul>
			</div>
			<div className="sidebarItem">
				<span className="sidebarTitle">FOLLOW US</span>
				<div className="sidebarSocial">
					<i className="sidebarIcon fab fa-facebook-square"></i>
					<i className="sidebarIcon fab fa-twitter-square"></i>
					<i className="sidebarIcon fab fa-pinterest-square"></i>
					<i className="sidebarIcon fab fa-instagram-square"></i>
				</div>
			</div>
		</div>
	)
}
