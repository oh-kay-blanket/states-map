import React from 'react'
import { useState } from 'react'
import './App.css'
import stateLabels from './us-state-labels.json'
import bills from './bills-output.json'
import billsUS from './bills-us-output.json'
import geoUrl from './states.json'

import Bill from './Bill.tsx'

import {
	ComposableMap,
	Geographies,
	Geography,
	ZoomableGroup,
	Annotation,
} from 'react-simple-maps'

function App() {
	const [position, setPosition] = useState({ coordinates: [-97, 38], zoom: 1 })
	const [selectedState, setSelectedState] = useState(null)
	const [activeGeography, setActiveGeography] = useState(null)

	const getBillsByState = (selectedState) => {
		const filteredBills = bills.filter((bill) => bill.State == selectedState)
		if (filteredBills.length > 0) {
			return filteredBills.map((bill, idx) => <Bill key={idx} bill={bill} />)
		} else {
			return <p>🎉 No anti-trans bills found in {selectedState} 🎉</p>
		}
	}

	const getUSBills = () => {
		return billsUS.map((bill, idx) => <Bill key={idx} bill={bill} />)
	}

	return (
		<>
			<h1>Anti-Trans Legislation Tracker</h1>
			<div className='legislation-widget'>
				<div id='map-container'>
					<ComposableMap projection='geoAlbersUsa'>
						<ZoomableGroup
							center={position.coordinates}
							zoom={position.zoom}
							onMoveEnd={(pos) => setPosition(pos)}
						>
							<Geographies geography={geoUrl}>
								{({ geographies }) =>
									geographies.map((geo) => {
										const isActive = activeGeography === geo.rsmKey
										return (
											<Geography
												key={geo.rsmKey}
												geography={geo}
												onClick={() => setSelectedState(geo.properties.name)}
												// onClick={() => setActiveGeography(geo.rsmKey)}
												onFocus={() => setActiveGeography(geo.rsmKey)} // Optional: support keyboard nav
												style={{
													default: {
														fill: isActive ? '#7fc7e0cc' : '#e99ca6',
														outline: 'none',
													},
													hover: {
														fill: isActive ? '#7fc7e0cc' : '#7fc7e0',
														outline: 'none',
													},
													pressed: {
														fill: isActive ? '#7fc7e0cc' : '#7fc7e0',
														outline: 'none',
													},
												}}
											/>
										)
									})
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
				{selectedState ? (
					<div className='bill-list'>
						<h2>{selectedState}</h2>
						<ul className='bills'>
							{selectedState !== 'National Bills'
								? getBillsByState(selectedState)
								: getUSBills()}
						</ul>
					</div>
				) : (
					<div className='bill-list'>
						<p>Select a state</p>
					</div>
				)}
			</div>
		</>
	)
}

export default App
