import React, { useState, useEffect } from 'react'
import './Bill.css'

const Bill = ({ bill, limit = 15 }) => {
	const [expanded, setExpanded] = useState(false)

	useEffect(() => {
		setExpanded(false) // Reset on bill change
	}, [bill])

	const isTruncated = bill.Summary.length > limit
	const summary =
		expanded || !isTruncated ? (
			bill.Summary
		) : (
			<>
				{bill.Summary.split(' ').slice(0, limit).join(' ')}
				<button
					onClick={() => setExpanded(!expanded)}
					className='summary--more'
				>
					...More
				</button>
			</>
		)

	// Get category list
	const categories = bill.Category.split(',').map((cat, i) => (
		<span className='category'>{cat}</span>
	))

	// Status class
	const statusClass = `status ${bill.Status.toLowerCase()}`

	// Progress section
	const getProgress = () => {
		if (bill.Status !== 'Active') return
		return `: ${bill.Progress}`
	}

	const updated = (
		<span className='updated'> ({bill['Last Activity Date']})</span>
	)

	return (
		<li className='bill'>
			<div className='row'>
				<p className='case'>{bill['﻿Case Name']}</p>
				<a
					href={bill['Bill Information Link']}
					className='bill-link'
					target='_blank'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='22'
						height='22'
						fill='currentColor'
						viewBox='0 0 24 24'
						style={{ marginLeft: '4px', verticalAlign: 'middle' }}
						aria-hidden='true'
					>
						<path d='M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z' />
						<path d='M5 5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7H5V5z' />
					</svg>
				</a>
			</div>
			<div className='row'>
				<div className='row--sub'>
					<span className={statusClass}></span>
					<p>
						<span className='status-title'>{bill.Status}</span>
						{getProgress()}
						{updated}
					</p>
				</div>
			</div>
			<p className='summary'>{summary}</p>

			<div className='row'>
				<p className='categories'>{categories}</p>
			</div>
		</li>
	)
}

export default Bill
