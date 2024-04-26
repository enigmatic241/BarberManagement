import React, { useState } from 'react'
import { Flexbox } from '../../styled-component'
import { Button, TextField, Typography } from '@material-ui/core'

import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../Authentication/auth'
import { useAuth } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom'

const Login = () => {
    const [loginForm, setLoginForm] = useState({ email: '', password: '', user_type: '' })
    const { userLoggedIn, isEmailUser, isGoogleUser, currentUser, setCurrentUser } = useAuth()

    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()


    const onSubmit = async (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            try {
                await doSignInWithEmailAndPassword(loginForm.email, loginForm.password)
                navigate('/home')

            } catch (err) {

                setIsSigningIn(false)

                setErrorMessage('Invalid Email or Password')
            }

        }
    }

    const onGoogleSignIn = (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            doSignInWithGoogle().catch(err => {
                setIsSigningIn(false)
            })
            navigate('/home')
        }
    }



    return (
        <> {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
            <Flexbox align={'center'} center={'center'} height={'calc(100vh - 64px)'} width={'100%'}>
                <Flexbox dir={'column'} style={{ border: "1px solid lightgray", borderRadius: "10px" }} width={'400px'} height={'400px'} pad={'30px'} gap={"30px"} bColor={'white'}>

                    <Typography style={{ fontWeight: 'bold' }} variant={'h5'}>Login</Typography>
                    <Flexbox>

                        <TextField
                            fullWidth
                            label={'Email'}
                            value={loginForm.email}
                            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        />
                    </Flexbox>
                    <Flexbox>
                        <TextField
                            fullWidth
                            label={'Password'}
                            value={loginForm.password}
                            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        />



                    </Flexbox>
                    <Button onClick={(e) => onSubmit(e)} variant={'contained'} color={'primary'}>Login</Button>
                    <Button
                        variant='contained'
                        color='secondary'
                        disabled={isSigningIn}
                        onClick={(e) => { onGoogleSignIn(e) }}
                    >
                        {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                    </Button>
                    {errorMessage && <Flexbox style={{ borderRadius: '5px' }} border={'1px solid lightgray'} pad={'8px'}>
                        <Typography color={'error'}>{errorMessage}</Typography>
                    </Flexbox>}

                </Flexbox>
            </Flexbox >
        </>
    )
}

export default Login

export const Logout = ({ handleMenuClose }) => {
    const { doSignOut } = useAuth()
    const navigate = useNavigate()
    const [isSignOut, setSignOut] = useState(false)
    const handleLogOut = async (e) => {
        e.preventDefault()
        if (!isSignOut) {
            setSignOut(true)
            try {
                await doSignOut()
                navigate('/')
            } catch (err) {
                // setErrorMessage(err.message)
                setSignOut(false)
            }


            // doSendEmailVerification()

        }
    }
    <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
}