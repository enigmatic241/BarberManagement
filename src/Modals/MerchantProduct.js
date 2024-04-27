import React, { useState, useEffect } from 'react'
import { Flexbox } from '../styled-component';
import { Typography, Button } from '@material-ui/core'
import ModalComponent from '../components/ModalComponent/ModalComponent'
import { getBarberProducts } from '../Api/apis';
import { useAuth } from '../Context/AuthContext';
import { ref, getDatabase, remove } from 'firebase/database';

const database = getDatabase()


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

    const handleRemoveProduct = async (product) => {


        const productRef = ref(database, `BarberProducts/${product.id}`);


        remove(productRef)
            .then(() => {
                console.log("Entry deleted successfully")
                getProducts();
            })
            .catch((error) => {
                console.error("Error deleting entry:", error);
            });
    }

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

                            <Button color={'secondary'} onClick={() => {
                                handleRemoveProduct(item)
                            }} variant={'contained'}>Remove</Button>
                        </Flexbox>
                    ))}

            </Flexbox>
        </ModalComponent>
    )
}

export default MerchantProduct