import React, { useState } from 'react'
import { Flexbox } from '../styled-component';
import { Typography, Button } from '@material-ui/core'
import ModalComponent from '../components/ModalComponent/ModalComponent'



const BarbProducts = [
    {
        name: 'Trim',
        price: '₹300',
        description: 'A simple and neat haircut to maintain your current style.',
    },
    {
        name: 'Layered Cut',
        price: '₹500',
        description: 'A haircut with layers to add volume and texture to your hair.',
    },
    {
        name: 'Bob Cut',
        price: '₹400',
        description: 'A classic short haircut where the hair is typically cut straight around the head at jaw-length.',
    },
    {
        name: 'Pixie Cut',
        price: '₹450',
        description: 'A short hairstyle with short, close-cropped hair on the sides and back of the head and slightly longer hair on top.',
    },
    // Add more barber products with name, price, and description as needed
];



const MerchantProduct = ({ open, handleClose }) => {
    const [barberProducts, setBarberProducts] = useState(BarbProducts)

    return (
        <ModalComponent
            open={open}
            onClose={handleClose}
            title={'Merchant Products'}
            // classes={classes}
            divider={true}
        >
            <Flexbox dir={'column'} pad={'16px'} height={'100%'} gap={'24px'} >
                {barberProducts.map(item => (
                    <Flexbox style={{ border: '1px solid lightgray' }} justify={'space-between'} key={item.name} gap={'8px'} pad={'8px'}>
                        <Typography>{item.name}</Typography>
                        <Typography>{item.price}</Typography>
                        <Typography>{item.description}</Typography>
                        <Button onClick={() => {
                            const updatedBookings = barberProducts.filter(booking => booking.name !== item.name)
                            setBarberProducts(updatedBookings)
                        }} variant={'contained'}>Cancel</Button>
                    </Flexbox>
                ))}

            </Flexbox>
        </ModalComponent>
    )
}

export default MerchantProduct