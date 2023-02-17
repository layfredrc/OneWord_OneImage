import { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => localStorage.getItem('authTokens')
        ? jwt_decode(localStorage.getItem('authTokens'))
        : null);

    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens')
        ? JSON.parse(localStorage.getItem('authTokens'))
        : null);


    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        console.log("form submitted")
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": e.target.username.value,
                "password": e.target.password.value
            }),
        })
        const data = await response.json();
        console.log('data', data)
        console.log('response', response)
        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            console.log("authTokens", authTokens)
            navigate('/');
        } else {
            alert('Wrong username or password')
        }
    }


    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/');
    }

    const updateToken = async (e) => {
        const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "refresh": authTokens?.refresh, }),
        })
        const data = await response.json();

        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            console.log("authTokens refresh", authTokens)
        } else {
            logoutUser();
        }

        if (loading) {
            setLoading(false);
        }
    }

    const contextData = {
        loginUser: loginUser,
        logoutUser: logoutUser,
        user: user,
        authTokens: authTokens,
    }

    useEffect(() => {

        if (loading) {
            updateToken();
        }

        const interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }

        }, 1000 * 60 * 4);
        return () => {
            clearInterval(interval);
        }
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}