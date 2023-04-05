import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import {AuthContext} from '../../contexts/AuthContext'
import AlertMessage from '../Layout/AlertMessage'

const Login = () => {

    const {loginUser} = useContext(AuthContext)

    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })

    const [alert, setAlert] = useState(null)

    const {username, password} = loginForm
    
    const onChangeLoginForm = event => setLoginForm({...loginForm, [event.target.name]: event.target.value})

    const login = async event => {
        event.preventDefault()
        
        try {
            const loginData = await loginUser(loginForm)     
            if(!loginData.success) {
				setAlert({ type: 'danger', message: loginData.message })
				setTimeout(() => setAlert(null), 5000)
			}
        }catch(error){
            console.log(error)
        }       
    }

  return(
  <>
    <Form className='my-4' onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group>
            <Form.Control
            className='my-2' 
            type='text' 
            placeholder='Username' 
            name='username'
            value={username} 
            onChange={onChangeLoginForm}
            required
            />
        </Form.Group>
        <Form.Group>
            <Form.Control
            className='my-2'
            type='password' 
            placeholder='Password' 
            name='password'
            value={password}
            onChange={onChangeLoginForm}
            required
            />
        </Form.Group>
        <Button 
        variant='success' 
        type='submit'
        >
            Login
        </Button>
    </Form>
    <p>
        Don't have an account ?
        <Link to='/register'>
            <Button 
            variant='info' 
            size='sm' 
            className='m-2'>
                Register
            </Button>    
        </Link>
    </p>
    </>
  )
}

export default Login