import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Logo from '../../assets/LogoRedBi.png'
import logoutIcon from '../../assets/logout.svg'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import Search from './Search'
import Cart from './Cart'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'

const NavBar = () => {
	const {
		authState: {
			user,
			isAuthenticated
		},
		logoutUser
	} = useContext(AuthContext)

	// console.log(AuthContext)

	const logout = () => logoutUser()

	let body
	if(isAuthenticated && user.role === "admin") 
	body = 
	(
			<>	
				<Nav className="navbar bg-light">
					<div className="container-fluid">
						<span className="navbar-brand mb-0 h1">Admin {user.username}</span>
					</div>
				</Nav>
				<Nav className="position-absolute top-10 end-0">
					<Button
						variant='secondary'
						className='font-weight-bolder text-white'
						onClick={logout}
					>
						<img
							src={logoutIcon}
							alt='logoutIcon'
							width='32'
							height='32'
							className='mr-2'
						/>
							Logout
					</Button>
				</Nav>
			</>
		)
	else if (isAuthenticated && user.role !== "admin")
		body = 
		(
			<>	
				<Nav className="position-absolute top-10 end-0">		
					<Cart user={user}/>
					<Button
						variant='secondary'
						className='font-weight-bolder text-white'
						onClick={logout}
					>
						<div className="container-fluid">
							<span className="navbar-brand mx-auto h1">{user.username}</span>
						</div>
						<img
							src={logoutIcon}
							alt='logoutIcon'
							width='32'
							height='32'
							className='mx-2'
						/>
							Logout
					</Button>
				</Nav>
			</>
		)	
	else
		body = 
		(
			<>	
				<Button
						variant='secondary'
						className='font-weight-bolder text-white'
					>
						<img
							src={logoutIcon}
							alt='logoutIcon'
							width='32'
							height='32'
							className='mx-2'
						/>
						<Nav.Link
						className='font-weight-bolder text-white'
						to='/login'
						as={Link}
						>
						Login
				</Nav.Link>
				</Button>
			</>	
		)

		let menu 
	if(isAuthenticated && user.role === "admin")
	menu = (
		<>
			<Button
				className="mx-1 my-2 btn btn-primary"
				type="button"
				>
				<Nav.Link
					className='font-monospace fw-bolder fs-2 text-white mx-2'
					to='/admin/products'
					as={Link}
					>
					Products
				</Nav.Link>
			</Button>
			<Button
				className="mx-1 my-2 btn btn-primary"
				type="button"
				>
				<Nav.Link
					className='font-monospace fw-bolder fs-2 text-white mx-2'
					to='/admin/brands'
					as={Link}
					>
					Brands
				</Nav.Link>
			</Button>
			<Button
				className="mx-1 my-2 btn btn-primary"
				type="button"
				>
				<Nav.Link
					className='font-monospace fw-bolder fs-2 text-white mx-2'
					to='/admin/categories'
					as={Link}
					>
					Categories
				</Nav.Link>
			</Button>
			<Button
				className="mx-1 my-2 btn btn-primary"
				type="button"
				>
				<Nav.Link
					className='font-monospace fw-bolder fs-2 text-white mx-2'
					to='/admin/orders'
					as={Link}
					>
					Orders
				</Nav.Link>
			</Button>
		</>
	)
	else
	menu = (
		<>
			<Button
				className="mx-1 my-2 btn btn-primary"
				type="button"
				>
				<Nav.Link
					className='font-monospace fw-bolder fs-2 text-white mx-2'
					to='/dashboard'
					as={Link}
					>
					Home
				</Nav.Link>
			</Button>
			{/* <Button
				className="mx-1 my-2 btn btn-primary"
				type="button"
				>
				<Nav.Link
					className='font-monospace fw-bolder fs-2 text-white mx-2'
					to='/games'
					as={Link}
					>
					Games
				</Nav.Link>
			</Button>
			<Button
				className="mx-1 my-2 btn btn-primary"
				type="button"
				>
				<Nav.Link
					className='font-monospace fw-bolder fs-2 text-white mx-2'
					to='/console'
					as={Link}
					>
					Console
				</Nav.Link>
			</Button>
			<Button
				className="mx-1 my-2 btn btn-primary"
				type="button"
				>
				<Nav.Link
					className='font-monospace fw-bolder fs-2 text-white mx-2'
					to='/accessories'
					as={Link}
					>
					Accessories
				</Nav.Link>
			</Button> */}
			<Nav className='mx-2 my-2'>
				
			</Nav>
			<Nav>
				<Search />
			</Nav>
		</>
	)

	return (
		<Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
			<Navbar.Brand className='font-weight-bolder text-white'>
				<img
					src={Logo}
					alt='Logo'
					width='60'
					height='60'
					className='mx-2 my-2'
				/>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls='basic-navbar-nav' />

			<Navbar.Collapse id='basic-navbar-nav'>
				{menu}
				{body}
			</Navbar.Collapse>
			
		</Navbar>
	)
}

export default NavBar