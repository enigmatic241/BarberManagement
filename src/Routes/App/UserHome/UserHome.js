import React, { useEffect } from 'react'
import { Flexbox } from '../../../styled-component'
import { Typography, Button } from '@material-ui/core'

import BookNow from '../../../Modals/BookNow'
import { getBarberShops } from '../../../Api/apis'


const DUMMY_BARBER_SHOP = [
    {
        name: 'Habib Salon',
        address: ' 123 Main Street, Anytown, USA 12345',
        phone: '1234567890'
    },
    {
        name: 'Lakme Salon',
        address: ' 123 Main Street, Anytown, USA 12345',
        phone: '8114535615'
    },
    {
        name: 'Loreal Salon',
        address: ' 123 Main Street, Anytown, USA 12345',
        phone: '8114535615'
    },
]


const UserHome = () => {
    const [open, setOpen] = React.useState(false)
    const [barberShops, setBarberShops] = React.useState([])



    const handleGetBarberShop = async () => {
        const response = await getBarberShops()
        if (response) {
            setBarberShops(response)

        }
    }

    useEffect(() => {
        handleGetBarberShop()
    }, [])
    return (
        <Flexbox style={{
            flexWrap: 'wrap',
            marginTop: '64px',
            justifyContent: 'center',
        }} gap={'16px'} pad={'16px'} >


            {
                barberShops.map((shop, index) => {
                    return (
                        <>
                            <Card key={index} shop={shop} setOpen={setOpen} />
                            <BookNow shop={shop} shop_name={shop.name} open={open} handleClose={() => setOpen(false)} title={'Profile'} />
                        </>
                    )
                })
            }

        </Flexbox>
    )
}

const Card = ({ setOpen, shop }) => {

    return (
        <Flexbox style={{
            border: '1px solid lightgray',
            borderRadius: '10px',
        }} dir={'column'} width={'300px'} height={'300px'} pad={'16px'} bColor={'white'}>
            <Flexbox height={'100%'} justify={'space-between'} dir={'column'}>
                <Flexbox dir={'column'} gap={'10px'}>
                    <Typography bold>{shop.name}</Typography>
                    <Typography>Owner : {shop.owner}</Typography>
                    <Typography>Address : {shop.address}</Typography>
                    <Typography>Phone:{shop.phone}</Typography>
                </Flexbox>
                <Button onClick={() => { setOpen(true) }} color={'primary'} variant={'contained'}>Book Appointment</Button>
            </Flexbox>

        </Flexbox>
    )
}

export default UserHome


