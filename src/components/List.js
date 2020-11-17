import React from 'react'
import './List.css'
import PropTypes from 'prop-types';

function List(props) {
    return (
        <ul className="list-box">
			{props.places.length < 100 && props.places.map((mark, index) => {
				return (
				<li 
					key={index.toString()} 
					className="list-item"
					onClick={(e) => props.onClick(index, e)}
					>
					{`lat: ${mark.lat}  lng: ${mark.lng}`}
				</li>
				)
			})}
        </ul>
    )
}

List.defaultProps = {
	places: []
}

List.propType = {
	places: PropTypes.array
}

export default List