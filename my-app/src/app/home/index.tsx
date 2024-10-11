
import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { ItemsListType } from '../types'
import { List, Card, Rate, Drawer, Spin, } from 'antd'
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import DrawerUpdate from './components/drawerUpdate';
import { useBearStore } from '../state';

const { Meta } = Card;


export default function HomeView() {

    const { items, addAllItems, updateItem } = useBearStore()

    // const [products, setProducts] = useState<ItemsListType>(items)
    const [loading, setLoading] = useState<boolean>(true)
    const [openDrawer, setOpenDrawer] = useState<boolean>(false)



    const navigate = useNavigate()

    async function getProducts(): Promise<void> {
        try {
            setLoading(true)
            const response: AxiosResponse<ItemsListType, null> = await axios.get('https://fakestoreapi.com/products')
            // setProducts(response.data)
            addAllItems(response.data)
            

            setLoading(false)

        } catch (error) {
            // setLoading(false)
            console.log(error)
        }
    }

    useEffect((() => {
        (() => { getProducts() })()
    }), [])

    console.log(items)
    return (

         <>
        {loading && items.length === 0 ?
             <div className="flex h-full items-center w-full justify-center" ><Spin size="large" /></div>
             :
             <List split={false} className='flex justify-center h-auto items-center full w-full flex-col bg-gray-200 overflow-y-auto'
                 bordered
                 dataSource={items}
                 renderItem={(item) => (
                     <List.Item className='overflow-hidden' onDoubleClick={() => {
                         navigate(`product/${item.id}`)
                    }}>
                         <Card className='max-w-7xl w-full overflow-hidden flex select-none gap-10 pr-8 justify-between items-center divide-y-0' loading={loading} actions={[
                            <div className='flex flex-col h-full gap-10 w-full items-end'>
                                 <Icon className='text-gray-800' icon="fluent:edit-12-filled" height={22} onClick={() => setOpenDrawer(true)} />
                                 <span className='text-3xl text-gray-800' >{item.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                             </div>
                         ]} bordered hoverable>
                            <Meta avatar={<img className='h-28 w-28 object-contain' src={item.image} alt='Error' />} title={<span className='text-xl'>{item.title} </span>} description={<div className='flex flex-col gap-4'>
                                 <span className='text-lg text-justify line-clamp-2 '>{item.description}</span>
                                 <div className='flex flex-row gap-4 justify-start items-center'>
                                     <Rate defaultValue={item.rating.rate} />
                                     <span>{item.rating.count} Avaliações</span>
                                 </div>
                            </div>} />
                        </Card>
                     </List.Item>
                )}
            />}
             <Drawer
                 title="Editar"
                 placement={'right'}
                 width={700}
                 onClose={() => setOpenDrawer(false)}
                 open={openDrawer}
            >
                 <DrawerUpdate />
             </Drawer> 

        </>
    )
}