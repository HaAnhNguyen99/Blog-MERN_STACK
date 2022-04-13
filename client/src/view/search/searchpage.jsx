import { useState } from 'react'
import Search from '../../components/search/search'
function searchpage() {
	// const [post, setpost] = useState('')
	// const [file, setFile] = useState(null)
	const { search } = window.location
	const query = new URLSearchParams(search).get('value')
	return (
		<>
			<Search />
			<ul>{}</ul>
		</>
	)
}

export default searchpage
