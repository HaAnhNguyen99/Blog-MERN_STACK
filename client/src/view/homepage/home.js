import React, { Component } from 'react'
import axios from 'axios'
class Home extends Component {
	state = {
		resp: []
	}
	componentDidMount() {
		axios
			.get(`blog`)
			.then((res) => {
				const resp = res.data
				this.setState({ resp })
			})
			.catch((error) =>
				console.error(error, console.log('Get data failed!!! '))
			)
	}
	render() {
		return (
			<div>
				<h1 style={{ textAlign: 'center' }}>Home Page</h1>
				<ul
					style={{
						textAlign: 'center',
						listStyle: 'none'
					}}
				>
					{this.state.resp.map((resp) => (
						<li
							style={{
								padding: '10px',
								color: 'blue',
								fontsize: '150%'
							}}
							key={resp._id}
						>
							{resp.title}
						</li>
					))}
				</ul>
			</div>
		)
	}
}

export default Home
