import React from 'react'
import { Flexbox } from '../../styled-component'
import { Typography } from '@material-ui/core'


const AppMainPage = () => {
    return (
        <Flexbox style={{
            paddingLeft: '32px',
            marginTop: '100px',
        }} align={'center'} justify={'center'} height={'calc(100vh - 80px'} >
            <Flexbox padding={'32px'} width={'600px'} height={'500px'} style={{ borderRadius: '10px' }} >
                <Typography style={{ color: 'white' }} variant='h2'>
                    Welcome to the App, Please Login/Register to continue
                </Typography>
            </Flexbox>
        </Flexbox >
    )
}


export default AppMainPage