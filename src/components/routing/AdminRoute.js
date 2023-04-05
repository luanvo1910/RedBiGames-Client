import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import Spinner from 'react-bootstrap/Spinner'
import NavbarMenu from '../Layout/NavBar'

const AdminRoute = ({ component: Component, ...rest }) => {
	const {
		authState: { authLoading, isAuthenticated, user }
	} = useContext(AuthContext)

	if (authLoading)
		return (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)

	return (
		<Route
			{...rest}
			render={props =>
				isAuthenticated && user.role === "admin" ? (
					<>
						<NavbarMenu />
						<Component {...rest} {...props} />
					</>
				) : (
					<Redirect to='/' />
				)
			}
		/>
	)
}

export default AdminRoute