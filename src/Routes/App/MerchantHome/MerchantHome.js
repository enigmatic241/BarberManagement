import { Typography, Button } from '@material-ui/core'
import { Flexbox } from '../../../styled-component'
import React, { useEffect } from 'react'
import { getBarberShops } from '../../../Api/apis'
import { useAuth } from '../../../Context/AuthContext'
import { ref, getDatabase, remove } from 'firebase/database'

const database = getDatabase()


const MerchantHome = () => {

    const [myShop, setMyShop] = React.useState([])
    const { currentUser } = useAuth()

    const handleGetMyShop = async () => {
        const response = await getBarberShops()
        if (response) {
            const filterShop = response.filter(item => item.owner === currentUser.email)
            setMyShop(filterShop)
        }
    }

    useEffect(() => { handleGetMyShop() }, [])

    const handleRemoveShop = (shop) => {
        console.log(shop)
        // const response = await removeShop(shop)
        const bookingRef = ref(database, `BarberShops/${shop.id}`);

        // Remove the entry
        remove(bookingRef)
            .then(() => {
                console.log("Entry deleted successfully")
                handleGetMyShop();
            })
            .catch((error) => {
                console.error("Error deleting entry:", error);
            });
    }

    const handleUpdateStatus = (shop) => {

    }

    return (
        <Flexbox dir={'column'} align={'center'} justify={'center'} margin={'64px 0'} gap={'16px'}>
            <Typography variant='h4' style={{ color: 'white' }}>My Shops</Typography>
            <Flexbox dir={'column'} align={'center'} justify={'center'} gap={'16px'}>
                {
                    myShop.map((shop, index) => {
                        return (
                            <ShopCard handleRemoveShop={handleRemoveShop} shop={shop} key={index} shopName={shop.name} ShopAddress={shop.address} phone={shop.phone} />
                        )
                    })
                }
            </Flexbox>
        </Flexbox>
    )
}


const ShopCard = ({ shopName, ShopAddress, phone, shop, handleRemoveShop }) => {
    return (
        <Flexbox pad={'22px'} width={'50vw'} dir={'column'} gap={'8px'} bColor={'white'} style={{ border: '1px solid lightgray', borderTop: "4px solid #107869", borderRadius: '5px' }}>
            <Flexbox justify={'space-between'}>
                <Typography>Shop Name : {shopName}</Typography>
                <Button onClick={() => {
                    handleRemoveShop(shop)
                }} variant={"contained"} color={'secondary'}>Remove Shop</Button>
            </Flexbox>

            <Typography>Shop Address:{ShopAddress}</Typography>
            <Typography>Shop Phone:{phone}</Typography>
        </Flexbox >
    )
}

export default MerchantHome