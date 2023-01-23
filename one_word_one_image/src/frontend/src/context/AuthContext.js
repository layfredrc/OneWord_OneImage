import { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [authTokens, setAuthTokens] = useState(null);

    let loginUser = async (e) => {
        e.preventDefault();
        console.log("form submitted")
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": e.target.username.value,
                "password": e.target.password.value
            }),
        })
        let data = await response.json();
        console.log('data', data)
        console.log('response', response)
        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            console.log("authTokens", authTokens)
        } else {
            alert('Wrong username or password')
        }
    }

    let contextData = {
        loginUser: loginUser,
        user: user,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}