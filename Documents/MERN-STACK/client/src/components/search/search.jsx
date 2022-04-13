import React, { useState } from 'react'
import './search.css'
function search() {
	return (
		<div>
			<form method="get" className="searchform">
				<input
					type="search"
					id="formSearch"
					placeholder="Search something..."
					name="value"
					className="form-control"></input>
				<button
					className="btn btn-primary"
					id="buttonSearch">
					<i className="fas fa-search"></i>
				</button>
			</form>
		</div>
	)
}

export default search
