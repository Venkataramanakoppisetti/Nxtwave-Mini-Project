import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; 
import './index.css';

const Login = () => {
    const navigate = useNavigate();
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showSubmitError, setShowSubmitError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const onChangeUsername = event => {
        setUsername(event.target.value);
    }

    const onChangePassword = event => {
        setPassword(event.target.value);
    }

    const onLoginSuccess = jwtToken => {
        console.log("Login successful. JWT Token:", jwtToken); // Debug log
        Cookies.set('jwt_token', jwtToken, { expires: 30 }); 
        navigate('/'); // Navigate to home after setting cookie
    }

    const onLoginFailure = msg => {
        setShowSubmitError(true);
        setErrorMsg(msg);
    }

    const onSubmitLogin = async event => {
        event.preventDefault();

        // Validate input fields
        if (!userName || !password) {
            setShowSubmitError(true);
            setErrorMsg("Username and Password are required...");
            return; 
        }

        const userDetails = { username: userName, password: password }; 
        const api = "https://apis.ccbp.in/login";
        const options = {
            method: "POST",
            body: JSON.stringify(userDetails)
        };

        try {
            const response = await fetch(api, options);
            const data = await response.json();
            
            console.log("API Response:", data);
            
            if (response.ok) {
                onLoginSuccess(data.jwt_token); 
            } else {
                console.log("Login failed with response:", data); 
                onLoginFailure(data.error_msg);
            }
        } catch (error) {
            console.error("Error occurred:", error); 
            onLoginFailure("Something went wrong. Please try again."); 
        }

        console.log("Form is submitted");
    }

    return (
        <>
            <div className='login-container'>
                <div className="middle-container">
                    <img 
                        src="https://res.cloudinary.com/ddry7fpzp/image/upload/v1662296727/Movies_Logo_vr3wvf.png" 
                        alt="Logo" 
                        className="web-logo" 
                    />
                    <form action="#" className="login-form-container" onSubmit={onSubmitLogin}>
                        <h1 className="login-heading">Login</h1>
                        <div className="user-input-container">
                            <label htmlFor="username" className="user-lables">USERNAME</label>
                            <input 
                                type="text" 
                                className="user-input" 
                                placeholder='username' 
                                id='username' 
                                onChange={onChangeUsername} 
                            />
                        </div>
                        <div className="user-input-container">
                            <label htmlFor="password" className="user-lables">PASSWORD</label>
                            <input 
                                type="password" 
                                className="user-input" 
                                placeholder='password' 
                                id='password' 
                                onChange={onChangePassword} 
                            />
                        </div>
                        {showSubmitError && <p className="error-message">{errorMsg}</p>}
                        <button type="submit" className="submit-button">Login</button>
                        
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;
