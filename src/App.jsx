import { useState } from 'react'
import './App.css'
import stateLabels from './us-state-labels.json'
import bills from './bills-output.json'

import {
	ComposableMap,
	Geographies,
	Geography,
	ZoomableGroup,
	Annotation,
} from 'react-simple-maps'

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

function App() {
	const [position, setPosition] = useState({ coordinates: [-97, 38], zoom: 1 })
	const [selectedState, setSelectedState] = useState(null)

	const getBillsByState = (selectedState) => {
		const filteredBills = bills.filter((bill) => bill.State == selectedState)

		return filteredBills.map((bill) => {
			// Get category list
			const categories = bill.Category.split(',').map((cat, i) => (
				<span className='category'>
					{cat} {i < bill.Category.split(',').length - 1 && ', '}
				</span>
			))

			console.log(categories)

			// Status class
			const statusClass = `status ${bill.Status.toLowerCase()}`

			// Progress section
			const getProgress = () => {
				if (bill.Status !== 'Active') return
				return `: ${bill.Progress}`
			}

			const updated = (
				<p className='updated'>Updated: {bill['Last Activity Date']}</p>
			)

			return (
				<li className='bill'>
					<div className='row'>
						<div className='row--sub'>
							<p className='case'>{bill['﻿Case Name']}</p>
							<p className={statusClass}>
								<strong>{bill.Status}</strong>
								{getProgress()}
							</p>
						</div>
						{updated}
					</div>
					<p className='summary'>{bill.Summary}</p>
					<div className='row'>
						<p className='categories'>{categories}</p>
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
				</li>
			)
		})
	}

	return (
		<>
			<h1>Legislation Tracker</h1>
			<p>Click on a state to learn more about it</p>
			<div id='map-container'>
				<ComposableMap projection='geoAlbersUsa'>
					<ZoomableGroup
						center={position.coordinates}
						zoom={position.zoom}
						onMoveEnd={(pos) => setPosition(pos)}
					>
						<Geographies geography={geoUrl}>
							{({ geographies }) =>
								geographies.map((geo) => (
									<Geography
										key={geo.rsmKey}
										geography={geo}
										onClick={() => setSelectedState(geo.properties.name)}
										style={{
											default: { fill: '#e99ca6', outline: 'none' },
											hover: { fill: '#7fc7e0', outline: 'none' },
											pressed: { fill: '#7fc7e0', outline: 'none' },
										}}
									/>
								))
							}
						</Geographies>
						{stateLabels.map(({ id, coordinates }) => (
							<Annotation
								key={id}
								subject={coordinates}
								dx={0}
								dy={0}
								connectorProps={{ stroke: 'none' }}
							>
								<text
									x='0'
									y='0'
									textAnchor='middle'
									alignmentBaseline='middle'
									fontSize={8}
								>
									{id}
								</text>
							</Annotation>
						))}
					</ZoomableGroup>
				</ComposableMap>
			</div>
			{selectedState && (
				<>
					<h2>{selectedState}</h2>
					<ul className='bills'>{getBillsByState(selectedState)}</ul>
				</>
			)}
		</>
	)
}

export default App
