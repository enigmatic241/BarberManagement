import React, { useEffect, useState } from 'react'
import { Flexbox } from '../styled-component'
import { TextField, Typography, Button } from '@material-ui/core'
import ModalComponent from '../components/ModalComponent/ModalComponent'
import TimeSelector from '../utils/TimeSelector'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { addUserBookings, getBarberProducts } from '../Api/apis'
import { useAuth } from '../Context/AuthContext'


const BookNow = ({ open, handleClose, shop_name, shop }) => {
    const [bookForm, setBookForm] = useState({ name: '', price: '', time: '', gender: '', phone: '' })
    const { currentUser } = useAuth()
    const [barberProducts, setBarberProducts] = useState([])

    const handleAddBookings = async () => {
        try {
            const response = await addUserBookings({
                ...bookForm,
                shopId: shop_name,
                email: currentUser.email,
                owner: shop.owner,
            })
            handleClose()
        } catch (err) {
            console.log(err)
        }
    }

    const handleGetShopProducts = async () => {
        const response = await getBarberProducts()
        if (response) {
            const filteredProducts = response.filter(item => item.owner === shop.owner && item.shopName === shop_name)
            setBarberProducts(filteredProducts)
        }
    }

    useEffect(() => {
        if (open) {
            handleGetShopProducts()
        }
    }, [open])


    return (
        <ModalComponent
            open={open}
            onClose={handleClose}
            title={`Book Now in ${shop_name}`}
            divider={true}
        >
            <Flexbox dir={'column'} pad={'16px'} gap={'24px'}>
                <Flexbox dir={'column'} gap={'16px'}>
                    <TextField
                        fullWidth
                        label={'Name'}
                        value={bookForm.name}
                        onChange={(e) => setBookForm({ ...bookForm, name: e.target.value })}
                    />

                    <Autocomplete
                        fullWidth
                        options={barberProducts}
                        getOptionLabel={(option) => `${option.name} - ${option.price}`}

                        onChange={(e) => setBookForm({ ...bookForm, gender: e.target.value })}
                        renderInput={(params) => <TextField
                            {...params}
                            fullWidth
                            label={'Service Name'}
                            value={bookForm.name}
                            onChange={(e) => setBookForm({ ...bookForm, name: e.target.value })}
                        />}
                    />

                    <Autocomplete
                        fullWidth
                        options={['Male', 'Female', 'Other']}
                        value={bookForm.gender}
                        onChange={(e, value) => setBookForm({ ...bookForm, gender: value })}
                        renderInput={(params) => <TextField {...params} label=" Select Gender" />}
                    />
                    <TextField
                        fullWidth
                        label={'Phone Number'}
                        value={bookForm.phone}
                        onChange={(e) => setBookForm({ ...bookForm, phone: e.target.value })}
                    />
                    <TimeSelector time={bookForm.time} handleTimeChange={
                        (val) => setBookForm({ ...bookForm, time: val.target.value })
                    } />
                </Flexbox>
                <Button color={'primary'} disabled={bookForm.time === '' || bookForm.name === ''} onClick={() => {
                    handleAddBookings()
                }} variant='contained'>
                    Book
                </Button>

            </Flexbox>
        </ModalComponent >
    )
}

export default BookNow