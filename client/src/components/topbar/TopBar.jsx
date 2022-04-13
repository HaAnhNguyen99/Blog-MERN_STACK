import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../context/ Context'
import './topbar.css'

export default function TopBar() {
	const { user, dispatch } = useContext(Context)
	const PF = 'http://localhost:3000/images/'
	const handleLogout = () => {
		dispatch({ type: 'LOGOUT' })
	}
	const navigate = useNavigate()
	function searchHandle() {
		navigate('/search')
	}
	return (
		<div className="top">
			<div className="topLeft">
				<i className="topIcon fab fa-facebook-square"></i>
				<i className="topIcon fab fa-twitter-square"></i>
				<i className="topIcon fab fa-pinterest-square"></i>
				<i className="topIcon fab fa-instagram-square"></i>
			</div>
			<div className="topCenter">
				<ul className="topList">
					<li className="topListItem">
						<Link className="link" to="/">
							HOME
						</Link>
					</li>
					<li className="topListItem">
						<Link className="link" to="/">
							ABOUT
						</Link>
					</li>
					<li className="topListItem">
						<Link className="link" to="/">
							CONTACT
						</Link>
					</li>
					<li className="topListItem">
						<Link className="link" to="/create">
							WRITE
						</Link>
					</li>
					<li className="topListItem" onClick={handleLogout}>
						{user && 'LOGOUT'}
					</li>
				</ul>
			</div>
			<div className="topRight">
				{user ? (
					<Link to="/settings">
						<img
							className="topImg"
							src={PF + user.profilePic}
							alt=""
						/>
					</Link>
				) : (
					<ul className="topList">
						<li className="topListItem">
							<Link className="link" to="/login">
								LOGIN
							</Link>
						</li>
						
					</ul>
				)}
				<span onClick={searchHandle}>
					<i className="topSearchIcon fas fa-search"></i>
				</span>
			</div>
		</div>
	)
}
