import React, { useState } from 'react'

import { Flexbox } from '../styled-component';
import { TextField, Button } from '@material-ui/core';
import ModalComponent from '../components/ModalComponent/ModalComponent';
import { addShops } from '../Api/apis';
import { useAuth } from '../Context/AuthContext';


const AddBarberShops = ({ open, handleClose, classes }) => {

    const [shopForm, setShopForm] = useState({ name: '', address: '', phone: '', image: '' })
    const { currentUser } = useAuth()

    const handleAddShops = async () => {
        const response = await addShops({
            ...shopForm,
            owner: currentUser.email,
            owner_name: currentUser.name
        })

        if (response) {
            alert('Shop Added Successfully')
            handleClose()
        }
    }

    return (
        <ModalComponent
            open={open}
            onClose={handleClose}
            title={'Add Shops'}
            classes={classes}
            divider={true}

        >
            <Flexbox dir={'column'} justify={'space-between'} gap={'28px'} margin={'16px'}>
                <Flexbox dir={'column'} gap={'16px'} >
                    <TextField
                        fullWidth
                        label={'Shop Name'}
                        value={shopForm.name}
                        onChange={(e) => setShopForm({ ...shopForm, name: e.target.value })}


                    />
                    <TextField
                        fullWidth
                        label={'Phone number'}
                        value={shopForm.phone}
                        onChange={(e) => setShopForm({ ...shopForm, phone: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        label={'Address'}
                        value={shopForm.address}
                        onChange={(e) => setShopForm({ ...shopForm, address: e.target.value })}
                    />
                </Flexbox>
                <Button onClick={() => {
                    handleAddShops()
                }} variant={'contained'}>
                    Add Shop
                </Button>
            </Flexbox>
        </ModalComponent>
    )
}


export default AddBarberShops