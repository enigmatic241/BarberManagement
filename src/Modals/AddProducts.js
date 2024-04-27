import React, { useState, useEffect } from 'react'

import { Flexbox } from '../styled-component';
import { TextField, Button } from '@material-ui/core';
import ModalComponent from '../components/ModalComponent/ModalComponent';
import { addProductsOfShops, getBarberShops } from '../Api/apis';
import { useAuth } from '../Context/AuthContext';
import { Autocomplete } from '@material-ui/lab';



const AddProducts = ({ open, handleClose, classes }) => {

    const [productsForm, setProductsForm] = useState({ name: '', price: '', description: '', shopName: '' })
    const [myShop, setMyShop] = useState([])

    const { currentUser } = useAuth()

    const handleGetMyShop = async () => {
        const response = await getBarberShops()
        if (response) {
            const filterShop = response.filter(item => item.owner === currentUser?.email)
            setMyShop(filterShop)
        }
    }
    useEffect(() => { if (open) handleGetMyShop() }, [open])

    const handleAddProducts = async () => {
        const response = await addProductsOfShops({
            ...productsForm,
            owner: currentUser.email,
            owner_name: currentUser.name
        })

        if (response) {
            alert('Product Added Successfully')
            handleClose()
        }
    }

    return (
        <ModalComponent
            open={open}
            onClose={handleClose}
            title={'Add Products'}
            classes={classes}
            divider={true}

        >
            <Flexbox dir={'column'} justify={'space-between'} gap={'28px'} margin={'16px'}>
                <Flexbox dir={'column'} gap={'16px'} >
                    <Autocomplete
                        fullWidth
                        options={myShop}
                        value={productsForm.shopName}
                        getOptionLabel={(option) => option.name}
                        onChange={(e, value) => setProductsForm({ ...productsForm, shopName: value.name })}
                        renderInput={(params) => <TextField {...params} label="Select Your Shop" />}
                    />
                    <TextField
                        fullWidth
                        label={'Service Name'}
                        value={productsForm.name}
                        onChange={(e) => setProductsForm({ ...productsForm, name: e.target.value })}


                    />
                    <TextField
                        fullWidth
                        label={'Price'}
                        value={productsForm.price}
                        onChange={(e) => setProductsForm({ ...productsForm, price: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        label={'Description'}
                        value={productsForm.description}
                        onChange={(e) => setProductsForm({ ...productsForm, description: e.target.value })}
                    />
                </Flexbox>
                <Button onClick={() => {
                    handleAddProducts()
                }} variant={'contained'}>
                    Add Product
                </Button>
            </Flexbox>
        </ModalComponent>
    )
}


export default AddProducts