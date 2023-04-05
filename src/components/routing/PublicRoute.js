import React from 'react'
import {Route} from 'react-router-dom'
import NavbarMenu from '../Layout/NavBar'

const PublicRoute = ({ component: Component, ...rest }) => {

	return (
		<Route
			{...rest}
			render={props =>
				(
					<>
						<NavbarMenu />
						<Component {...rest} {...props} />
					</>
				)
			}
		/>
	)
}

export default PublicRoute