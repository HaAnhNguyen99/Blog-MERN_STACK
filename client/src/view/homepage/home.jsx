import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../../components/header/Header'
import Sidebar from '../../components/sidebar/Sidebar'
import ReactPaginate from 'react-paginate'
import Posts from '../../components/posts/Posts'
import './home.css'

function Home() {
	const [resp, setresp] = useState([])
	const [currentItems, setCurrentItems] = useState(null)
	const [pageCount, setPageCount] = useState(0)
	const [firstItem, setfirstItem] = useState(0)
	const itemsPerPage = 4

	const getposts = async () => {
		await axios
			.get(`blog`)
			.then((res) => {
				setresp(res.data)
			})
			.catch((error) =>
				console.error(error, console.log('Get data failed!!! '))
			)
	}

	useEffect(() => {
		getposts()
	}, [])

	useEffect(() => {
		const endItem = firstItem + itemsPerPage
		console.log(`Loading items from ${firstItem} to ${endItem}`)
		setCurrentItems(resp.slice(firstItem, endItem))
		setPageCount(Math.ceil(resp.length / itemsPerPage))
	}, [resp, firstItem])

	const handlePageClick = (event) => {
		const newOffset = (event.selected * itemsPerPage) % resp.length
		console.log(
			`User requested page number ${event.selected}, which is offset ${newOffset}`
		)
		setfirstItem(newOffset)
	}

	return (
		<>
			<Header />
			<div className="home">
				<Posts posts={currentItems} />
				<Sidebar />
			</div>
			<ReactPaginate
				nextLabel="Next"
				onPageChange={handlePageClick}
				pageRangeDisplayed={3}
				marginPagesDisplayed={2}
				pageCount={pageCount}
				previousLabel="Previous"
				pageClassName="page-item"
				pageLinkClassName="page-link"
				previousClassName="page-item"
				previousLinkClassName="page-link"
				nextClassName="page-item"
				nextLinkClassName="page-link"
				breakLabel="..."
				breakClassName="page-item"
				breakLinkClassName="page-link"
				containerClassName="pagination"
				activeClassName="active"
				renderOnZeroPageCount={null}
			/>
		</>
	)
}

export default Home
