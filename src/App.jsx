import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {
	ComposableMap,
	Geographies,
	Geography,
	ZoomableGroup,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

function App() {
	const [position, setPosition] = useState({ coordinates: [-97, 38], zoom: 1 });
	const [selectedState, setSelectedState] = useState(null);

  return (
    <>
			<h1>US Map</h1>
			<p>Click on a state to learn more about it</p>
			<div id='map-container'>
				<ComposableMap projection="geoAlbersUsa">
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
								default: { fill: "#e99ca6", outline: "none" },
								hover: { fill: "#7fc7e0", outline: "none" },
								pressed: { fill: "#ffcc00", outline: "none" },
							}}
							/>
						))
						}
					</Geographies>
					</ZoomableGroup>
				</ComposableMap>
			</div>
			{selectedState && (
				<div className="state-info">
					<p>Active legislation in {selectedState}</p>
				</div>
			)}
		</>
  )
}

export default App
