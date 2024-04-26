import React, { useState } from 'react'
import { Flexbox } from '../styled-component'
import { TextField, Typography, Button } from '@material-ui/core'
import ModalComponent from '../components/ModalComponent/ModalComponent'
import TimeSelector from '../utils/TimeSelector'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { addUserBookings } from '../Api/apis'



const hairStyles = [
    { name: 'Trim', price: '₹300' },
    { name: 'Layered Cut', price: '₹500' },
    { name: 'Bob Cut', price: '₹400' },
    { name: 'Pixie Cut', price: '₹450' },
    { name: 'Fringe Cut', price: '₹350' },
    { name: 'Balayage', price: '₹700' },
    { name: 'Highlights', price: '₹600' },
    { name: 'Hair Extensions', price: '₹1000' },
    { name: 'Perm', price: '₹800' },
    { name: 'Updo', price: '₹600' },
    { name: 'Braids', price: '₹550' },
    { name: 'Hair Coloring', price: '₹700' },
    { name: 'Blowout', price: '₹400' },
    { name: 'Hair Straightening', price: '₹1000' },
    { name: 'Hair Relaxing', price: '₹900' },
];


const BookNow = ({ open, handleClose, shop_name }) => {
    const [bookForm, setBookForm] = useState({ name: '', price: '', time: '', gender: '', phone: '' })

    const handleAddBookings = async () => {
        try {
            const response = await addUserBookings({
                ...bookForm,
                shopId: shop_name
            })
            handleClose()
        } catch (err) {
            console.log(err)
        }


    }
    return (
        <ModalComponent
            open={open}
            onClose={handleClose}
            title={`Book Now in ${shop_name}`}

            divider={true}

        >
            <Flexbox dir={'column'} pad={'16px'} height={'100%'} gap={'24px'}>
                <Flexbox dir={'column'} gap={'16px'}>

                    <Autocomplete
                        fullWidth
                        options={hairStyles}
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
                        getOptionLabel={(option) => option}

                        onChange={(e) => setBookForm({ ...bookForm, gender: e.target.value })}
                        renderInput={(params) => <TextField
                            {...params}
                            fullWidth
                            label={'Gender'}
                            value={bookForm.gender}

                        />}
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
                <Button onClick={() => {
                    handleAddBookings()
                }} variant='contained'>
                    Book
                </Button>

            </Flexbox>
        </ModalComponent >
    )
}

export default BookNow