import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../helpers/UserContext';
import './Login.css'; // make sure to create a corresponding CSS file

const a = {u:'admin', p:'Kansai01'};

const Login = () => {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle login logic here
        // console.log('Email:', email, 'Password:', password);
        if(email == a.u.trim() && password == a.p.trim()){
            setUser({name:a.u.trim(), logged:true});
            navigate('/');
        }

    };


    return (
        <>
        <div className="login-container">
            <div>
            <div class="form-container">
                <div class="form-title">KAP Jini</div>
                <form className="login-form" onSubmit={handleSubmit}>

                      <div className="logo-container" style={{textAlign:'center'}}>
                        <span className="anim-left"><img className="main-logo" src="logo.gif" alt="Logo" /></span>
                        <div style={{fontSize:'24px'}}>Sign in</div>
                      </div>
                      <br/>
                    <input
                        type="input"
                        placeholder="Login"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Log In</button>
                </form>
            </div>
            <br/>
            <div className="form-container">
                <div className="login-footer" onSubmit={handleSubmit}>
                    Read the KAP user policy
                </div>
            </div>
            </div>
        </div>




        </>

    );
};

export default Login;
