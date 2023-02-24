import React from 'react'
import {Route} from 'react-router-dom'
import NavbarMenu from '../layout/NavBar'

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