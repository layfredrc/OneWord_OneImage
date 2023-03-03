import { createContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import jwt_encode from 'jwt-encode';
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
    const currentHost = `${window.location.protocol}//${window.location.hostname}`;
    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        console.log("form submitted")
        const response = await fetch(`${currentHost}:8000/api/token/`, {
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
            console.log('data', data)
            console.log('response', response)
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
        const response = await fetch(`${currentHost}:8000/api/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "refresh": authTokens?.refresh, }),
        })
        const data = await response.json();

        if (response.status === 200) {
            console.log(data);
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

    const signUpUser = async (e) => {
        e.preventDefault();

        // get email, username and password from the form
        const email = e.target.email.value;
        const username = e.target.username.value;
        const password = e.target.password.value;
        const secret = "";
        const encodedPassword = jwt_encode(password, secret);
        console.log(encodedPassword);
        const response = await fetch(`${currentHost}:8000/api/users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "username": username,
                "password": encodedPassword,
            }),
        })

        const data = await response.json();

        if (response.status === 201) {
            console.log(data);
            console.log("User Signed Up!");
            navigate('/');

        } else {
            alert('Something went wrong');
        }
    }


    const contextData = {
        loginUser: loginUser,
        logoutUser: logoutUser,
        user: user,
        authTokens: authTokens,
        signUpUser: signUpUser,
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