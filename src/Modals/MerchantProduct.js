import React, { useState, useEffect } from 'react'
import { Flexbox } from '../styled-component';
import { Typography, Button } from '@material-ui/core'
import ModalComponent from '../components/ModalComponent/ModalComponent'
import { getBarberProducts } from '../Api/apis';
import { useAuth } from '../Context/AuthContext';


const MerchantProduct = ({ open, handleClose }) => {
    const [barberProducts, setBarberProducts] = useState([])

    const { currentUser } = useAuth()

    const getProducts = async () => {
        const response = await getBarberProducts()
        if (response) {
            const filteredProducts = response.filter(item => item.owner === currentUser?.email)
            setBarberProducts(filteredProducts)
        }
    }


    useEffect(() => {
        if (open)
            getProducts()
    }, [open])

    return (
        <ModalComponent
            open={open}
            onClose={handleClose}
            title={'Merchant Products'}
            // classes={classes}
            divider={true}
        >
            <Flexbox dir={'column'} pad={'16px'} height={'100%'} gap={'24px'} >
                {barberProducts.legth === 0 ? <Typography>No Products</Typography> :
                    barberProducts.map(item => (
                        <Flexbox style={{ border: '1px solid lightgray' }} justify={'space-between'} key={item.name} gap={'8px'} pad={'8px'}>
                            <Typography>{item.name}</Typography>
                            <Typography>{item.price}</Typography>
                            <Typography>{item.description}</Typography>
                            <Typography>{item.shopName}</Typography>

                            <Button onClick={() => {
                                const updatedBookings = barberProducts.filter(booking => booking.name !== item.name)
                                // setBarberProducts(updatedBookings)
                            }} variant={'contained'}>Cancel</Button>
                        </Flexbox>
                    ))}

            </Flexbox>
        </ModalComponent>
    )
}

export default MerchantProduct