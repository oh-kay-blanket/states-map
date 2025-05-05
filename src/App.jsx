import { useState } from 'react'
import './App.css'
import stateLabels from "./us-state-labels.json";

import { ComposableMap,	Geographies, Geography,	ZoomableGroup, Annotation } from "react-simple-maps";

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
					{stateLabels.map(({ id, coordinates }) => (
						<Annotation
						key={id}
						subject={coordinates}
						dx={0}
						dy={0}
						connectorProps={{ stroke: "none" }}
						>
						<text x="0" y="0" textAnchor="middle" alignmentBaseline="middle" fontSize={8}>
							{id}
						</text>
						</Annotation>
					))}
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
