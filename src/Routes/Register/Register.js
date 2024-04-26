import React, { useState } from "react";
import { Flexbox } from "../../styled-component";
import { Button, TextField, Typography } from "@material-ui/core";



const Register = () => {
    const [registerForm, setRegisterForm] = useState({ email: '', password: '', userType: 'customer', mobile_no: '', address: '', name: '', gender: '' })
    return (
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
                    <Button variant={'contained'} color={'primary'}>Register</Button>
                </Flexbox>
            </Flexbox>
        </Flexbox>
    )
}


export default Register