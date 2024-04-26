import React, { useState } from 'react'

import { Flexbox } from '../styled-component';
import { TextField, Button } from '@material-ui/core';
import ModalComponent from '../components/ModalComponent/ModalComponent';


const AddProducts = ({ open, handleClose, classes }) => {

    const [productsForm, setProductsForm] = useState({ name: '', price: '', description: '' })

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
                <Button variant={'contained'}>
                    Add Product
                </Button>
            </Flexbox>
        </ModalComponent>
    )
}


export default AddProducts