
import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'
import { doCreateUserWithEmailAndPassword } from '../../Authentication/auth'
import { addUserDetails } from '../../Api/apis'
import { Flexbox } from '../../styled-component'
import { TextField, Button, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

const Register = () => {

    const navigate = useNavigate()

    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const [registerForm, setRegisterForm] = useState({ email: '', password: '', confirmPassword: '', user_type: '', address: '', phone: '' })

    const { userLoggedIn } = useAuth()

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!isRegistering) {
            setIsRegistering(true)
            await doCreateUserWithEmailAndPassword(registerForm.email, registerForm.password)
                .then(() => {
                    handleAddUserDetails()
                    navigate('/login')
                })
                .catch(err => {
                    setErrorMessage(err.message)
                    setIsRegistering(false)
                })

        }
    }

    const handleAddUserDetails = async () => {
        const response = await addUserDetails({
            ...registerForm,
            password: null,

        })

        if (response) {
            console.log(response, "handleAddUserDetails")
        }
    }

    return (
        <>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <main className="w-full h-screen flex self-center place-content-center place-items-center">
                <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
                    <div className="text-center mb-6">
                        <div className="mt-2">
                            <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Create a New Account</h3>
                        </div>

                    </div>
                    <form
                        onSubmit={onSubmit}
                        className="space-y-4"
                    >
                        <Flexbox style={{
                            background: 'rgb(2, 0, 36)',
                            background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 12%, rgba(0,212,255,1) 100%)'
                        }} align={'center'} center={'center'} height={'100vh'} width={'100%'} >
                            <Flexbox dir={'column'} style={{ border: "1px solid lightgray", borderRadius: "10px" }} width={'400px'} height={'80vh'} pad={'20px'} gap={"30px"} margin={'72px 0'} bColor={'white'}>
                                <Typography variant={'h6'}>Register</Typography>
                                <Flexbox dir={'column'} gap={'10px'}>
                                    <TextField
                                        fullWidth
                                        label={'Name'}
                                        value={registerForm.name}
                                        onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                                    />
                                    <TextField
                                        fullWidth
                                        label={'Email'}
                                        value={registerForm.email}
                                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                                    />
                                    <TextField
                                        fullWidth
                                        label={'Password'}
                                        value={registerForm.password}
                                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                                    />
                                    <TextField
                                        fullWidth
                                        label={'Confirm Password'}
                                        value={registerForm.confirmPassword}
                                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                                    />

                                    <Autocomplete
                                        fullWidth
                                        options={['CUSTOMER', 'MERCHANT']}
                                        value={registerForm.user_type}
                                        onChange={(e, value) => setRegisterForm({ ...registerForm, user_type: value })}
                                        renderInput={(params) => <TextField {...params} label="User Type" />}
                                    />
                                    <TextField
                                        fullWidth
                                        label={'Mobile No'}
                                        value={registerForm.mobile_no}
                                        onChange={(e) => setRegisterForm({ ...registerForm, mobile_no: e.target.value })} />
                                    <TextField
                                        fullWidth
                                        label={'Address'}
                                        value={registerForm.address}
                                        onChange={(e) => setRegisterForm({ ...registerForm, address: e.target.value })}
                                    />

                                </Flexbox>
                                <Flexbox>
                                    {/* <Button variant={'contained'} color={'primary'}>Register</Button> */}
                                    <Flexbox gap={'8px'} justify={'center'} align={'center'}>
                                        <Button
                                            disabled={registerForm.email === '' || registerForm.password === '' || registerForm.confirmPassword === '' || registerForm.mobile_no === '' || registerForm.address === '' || registerForm.user_type === '' || registerForm.password !== registerForm.confirmPassword}
                                            variant={'contained'}
                                            color={'primary'}
                                            type="submit"
                                            // disabled={isRegistering}
                                            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                                        >
                                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                                        </Button>
                                        <div className="text-sm text-center">
                                            Already have an account? {'   '}
                                            <Link to={'/login'} className="text-center text-sm hover:underline font-bold">Continue</Link>
                                        </div>
                                    </Flexbox>
                                </Flexbox>
                            </Flexbox>

                        </Flexbox>


                        {errorMessage && (
                            <span className='text-red-600 font-bold'>{errorMessage}</span>
                        )}



                    </form>
                </div>
            </main >
        </>
    )
}

export default Register

