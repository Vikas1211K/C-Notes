import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Singup = () => {
    const [cred, setcred] = useState({ name: "", email: "", password: "", cpassword: "" })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, email, password } = cred
        if (cred.password === cred.cpassword) {
            const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password })
            });
            const json = await response.json()
            console.log(json)
            if (!json.success) {
                alert("User alrady exists!!")
            }
            else {
                localStorage.setItem('token', json.authToken)
                navigate('/')
            }
        }
        else {
            alert("Miss-matched password")
        }
    }
    const onChange = (e) => {
        setcred({ ...cred, [e.target.name]: e.target.value })
    }

    return (
        <div className='container mt-3'>
            <h2>Signup to use C-note</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' value={cred.name} id="name" aria-describedby="nameHelp" onChange={onChange} minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={cred.email} id="email" aria-describedby="emailHelp" onChange={onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={cred.password} id="password" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name='cpassword' value={cred.cpassword} id="cpassword" onChange={onChange} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Singup