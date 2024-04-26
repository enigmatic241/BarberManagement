import React, { useState } from 'react'
import { Flexbox } from '../../styled-component'
import { Button, TextField, Typography } from '@material-ui/core'

import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../Authentication/auth'
import { useAuth } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom';




const Login = () => {
    const [loginForm, setLoginForm] = useState({ email: '', password: '' })
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
                setErrorMessage(err.message)
                setIsSigningIn(false)
            }


            // doSendEmailVerification()

        }
    }

    const onGoogleSignIn = (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            doSignInWithGoogle().catch(err => {
                setIsSigningIn(false)
            })
        }
    }

    return (
        <Flexbox align={'center'} center={'center'} height={'calc(100vh - 64px)'} width={'100%'}>
            <Flexbox dir={'column'} style={{ border: "1px solid lightgray", borderRadius: "10px" }} width={'400px'} height={'400px'} pad={'10px'} gap={"30px"} bColor={'white'}>

                <Typography variant={'h6'}>Login</Typography>
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
                <button
                    disabled={isSigningIn}
                    onClick={(e) => { onGoogleSignIn(e) }}
                >
                    {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                </button>

            </Flexbox>
        </Flexbox >
    )
}

export default Login