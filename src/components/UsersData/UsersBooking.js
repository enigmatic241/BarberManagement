import React, { useEffect, useState } from 'react'
import { Flexbox } from '../../styled-component';
import { Typography, Button } from '@material-ui/core'
import ModalComponent from '../../components/ModalComponent/ModalComponent'
import { getUsersBookings } from '../../Api/apis';
import { db } from '../../Authentication/firebase';
import { ref, remove } from 'firebase/database';



const Bookings = [
    { name: 'Trim', time: '30 mins', price: '₹300' },

    //change the price to time and price 
    { name: 'Layered Cut', time: '45 mins', price: '₹500' },
    { name: 'Bob Cut', time: '30 mins', price: '₹400' },
    { name: 'Pixie Cut', time: '30 mins', price: '₹450' },
    { name: 'Fringe Cut', time: '30 mins', price: '₹350' },
    { name: 'Balayage', time: '1 hr', price: '₹700' },
    { name: 'Highlights', time: '1 hr', price: '₹600' },
    { name: 'Hair Extensions', time: '1 hr 30 mins', price: '₹1000' },
    { name: 'Perm', time: '1 hr', price: '₹800' },
    { name: 'Updo', time: '1 hr', price: '₹600' },



];


const UsersBooking = ({ open, handleClose }) => {
    const [myBooking, setMyBookings] = useState(Bookings)

    const handleGetUserBookings = async () => {
        const response = await getUsersBookings()
        console.log(response, "usersbookings")
        setMyBookings(response)
    }

    const handleCancelBooking = async (id) => {
        try {
            await remove(db, `/UsersBookings/` + id)
            handleGetUserBookings()
        } catch (err) {
            console.log(err)
        }

    }
    console.log(myBooking, "myBooking")
    useEffect(() => {
        if (open)
            handleGetUserBookings()
    }, [open])
    return (
        <ModalComponent
            open={open}
            onClose={handleClose}
            title={'My Bookings'}
            // classes={classes}
            divider={true}
        >
            <Flexbox dir={'column'} pad={'16px'} height={'100%'} gap={'24px'} >
                {myBooking.length === 0 ?
                    <Typography>No Bookings</Typography> :
                    myBooking.map(item => (
                        <Flexbox style={{ border: '1px solid lightgray' }} justify={'space-between'} key={item.name} gap={'8px'} pad={'8px'}>
                            <Typography>{item.name}</Typography>
                            <Typography>{item.time}</Typography>
                            <Typography>{item.price}</Typography>
                            <Button onClick={() => {
                                handleCancelBooking(item.id)
                            }} variant={'contained'}>Cancel</Button>
                        </Flexbox>
                    ))}

            </Flexbox>
        </ModalComponent>
    )
}

export default UsersBooking