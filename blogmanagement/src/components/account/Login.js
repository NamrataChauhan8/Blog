import React, { useState, useEffect, useContext } from 'react';
import { TextField, Box, Button, Typography, styled, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material'; // Import eye icons
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
`

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
    const [login, setLogin] = useState({ ...loginInitialValue });
    const [signup, setSignup] = useState({ ...signupInitialValue });
    const [loginError, setLoginError] = useState('');
    const [signupError, setSignupError] = useState('');
    const [account, toggleAccount] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [showSignupPassword, setShowSignupPassword] = useState(false);

    const navigate = useNavigate();
    const { setAccount } = useContext(DataContext);

    useEffect(() => {
        setLoginError('');
        setSignupError('');
    }, [login, signup])

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value });
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const loginUser = async () => {
        if (!login.username || !login.password) {
            setLoginError('Username and password are required.');
            return;
        }
        let response = await API.userLogin(login);
        if (response.isSuccess) {
            setLoginError('');
            sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({ name: response.data.name, username: response.data.username });
            isUserAuthenticated(true)
            navigate('/');
        } else {
            setLoginError('Incorrect username or password. Please try again.');
        }
    }

    const signupUser = async () => {
        if (!signup.name || !signup.username || !signup.password) {
            setSignupError('All fields are required.');
            return;
        }
        let response = await API.userSignup(signup);
        if (response.isSuccess) {
            setSignupError('');
            setSignup({ ...signupInitialValue });
            toggleAccount('login');
        } else {
            setSignupError('Something went wrong! Please try again later.');
        }
    }

    const toggleSignup = () => {
        account === 'signup' ? toggleAccount('login') : toggleAccount('signup');
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleSignupPasswordVisibility = () => {
        setShowSignupPassword(!showSignupPassword);
    };

    return (
        <PageContainer>
            <Component>
                {account === 'login' ? (
                    <Wrapper>
                        <TextField variant="standard" value={login.username} onChange={(e) => onValueChange(e)} name='username' label="Enter Username" required />
                        <TextField variant="standard" value={login.password} onChange={(e) => onValueChange(e)} name='password' label="Enter Password" type={showPassword ? "text" : "password"} required />
                        <IconButton onClick={togglePasswordVisibility}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
                        {loginError && <Error>{loginError}</Error>}
                        <LoginButton variant="contained" onClick={() => loginUser()}>Login</LoginButton>
                        <Text style={{ textAlign: 'center', marginTop: '10px' }}>OR</Text>
                        <SignUpButton onClick={toggleSignup}>Create an account</SignUpButton>
                    </Wrapper>
                ) : (
                    <Wrapper>
                        <TextField id="name" onChange={onInputChange} name="name" label="Enter Name" variant="standard" required />
                        <TextField id="username" onChange={onInputChange} name="username" label="Enter Email" variant="standard" required />
                        <TextField id="password" onChange={onInputChange} name="password" label="Enter Password" variant="standard" type={showSignupPassword ? "text" : "password"} required />
                        <IconButton onClick={toggleSignupPasswordVisibility}>{showSignupPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
                        {signupError && <Error>{signupError}</Error>}
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
