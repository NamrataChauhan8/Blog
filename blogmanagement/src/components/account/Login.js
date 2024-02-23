
import React, { useState, useEffect, useContext } from 'react';
import { TextField, Box, Button, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const PageContainer = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Component = styled(Box)`
    width: 400px;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6);
`;
const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`;

const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    height: 48px;
    border-radius: 2px;
    margin-top: 20px;
    width: 100%;
`;

const SignUpButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2f74f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/20%);
    margin-top: 20px;
    width: 100%;
`;

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`;

const loginInitialValue = {
    username: '',
    password: ''
};
const signupInitialValue = {
    name: '',
    username: '',
    password: ''
};

const Login = ({ isUserAuthenticated }) => {
    const [login, setLogin] = useState({ ...loginInitialValue }); // Ensure initial values are defined
    const [signup, setSignup] = useState({ ...signupInitialValue }); // Ensure initial values are defined
    const [error, setError] = useState('');
    const [account, toggleAccount] = useState('login');

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    useEffect(() => {
        setError(''); // Clear error state
    }, [login])

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const loginUser = async () => {
        if (!login.username || !login.password) {
            setError('Username and password are required.');
            return;
        }

        try {
            const response = await API.userLogin(login);
            if (response.isSuccess) {
                setError('');
                sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
                setAccount({ name: response.data.name, username: response.data.username });
                isUserAuthenticated(true);
                setLogin({ ...loginInitialValue });
                navigate('/');
            } else {
                setError('Incorrect username or password. Please try again.');
            }
        } catch (error) {
            alert('Incorrect username or password. Please try again.');
        }
    }

    const signupUser = async () => {
        if (!signup.name || !signup.username || !signup.password) {
            setError('All fields are required.');
            return;
        }

        try {
            const response = await API.userSignup(signup);
            if (response.isSuccess) {
                setError('');
                setSignup({ ...signupInitialValue });
                toggleAccount('login');
            } else {
                alert('Something went wrong! Please try again later.');
            }
        } catch (error) {
            setError('Something went wrong! Please try again later.');
        }
    }

    const toggleSignup = () => {
        toggleAccount(account === 'signup' ? 'login' : 'signup');
    }

    return (
        <PageContainer>
            <Component>
                {account === 'login' ? (
                    <Wrapper>
                        <TextField variant="standard" value={login.username} onChange={(e) => onValueChange(e)} name='username' label="Enter Username" />
                        <TextField  variant="standard" value={login.password} onChange={(e) => onValueChange(e)} name='password' label="Enter Password" />

                        {error && <Error>{error}</Error>}

                        <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
                        <Text style={{ textAlign: 'center', marginTop: '10px' }}>OR</Text>
                        <SignUpButton onClick={toggleSignup}>Create an account</SignUpButton>
                    </Wrapper>
                ) : (
                    <Wrapper>
                        <TextField id="name" onChange={onInputChange} name="name" label="Enter Name" variant="standard" />
                        <TextField id="username" onChange={onInputChange} name="username" label="Enter Username" variant="standard" />
                        <TextField id="password" onChange={onInputChange} name="password" label="Enter Password" variant="standard" />

                        {error && <Error>{error}</Error>}

                        <SignUpButton onClick={signupUser} style={{ marginBottom: 50 }}>SignUp</SignUpButton>
                        <Text style={{ textAlign: 'center', marginTop: '20px' }}>OR</Text>
                        <LoginButton variant="contained" onClick={toggleSignup}> Already Have an account? </LoginButton>
                    </Wrapper>
                )}
            </Component>
        </PageContainer>
    );
};

export default Login;