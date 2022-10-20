import axios from 'axios'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './Login.css'

const Login = () => {
    
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    })

    const {loading, error, dispatch} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.id]: [e.target.value]}))
    }


    const handleClick = async(e) => {
        e.preventDefault();
        dispatch({type:"LOGIN_START"})

        try {
            const res = await axios.post("/login", credentials)
            dispatch({type: "LOGIN_SUCCESS", payload: res.data})
            navigate("/")
        } catch (error) {
            dispatch({type:"LOGIN_FAILURE", payload: error.response.data})
        }
    }


  return (
    <div className='login'>
        <div className="lContainer">
            <input type="text" className="lInput" placeholder='username' id='username' onChange={handleChange}/>
            <input type="password" className="lPassword" placeholder='password' id='password' onChange={handleChange}/>
            <button disabled={loading} onClick={handleClick} className="lButton">Login</button>
            {error && <span>{error.message}</span>}
        </div>
    </div>
  )
}

export default Login 