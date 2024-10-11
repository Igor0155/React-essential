import axios, { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import { ItemType } from "../../types";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Spin, Button, Rate, Breadcrumb } from 'antd';


export default function ProductView() {


    const { productId } = useParams();
    const [loading, setLoading] = useState<boolean>(true)
    const [product, setProduct] = useState<ItemType>()

    async function getProduct() {
        try {
            setLoading(true)
            const response: AxiosResponse<ItemType, null> = await axios.get(`https://fakestoreapi.com/products/${productId}`)
            setProduct(response.data)
            setLoading(false)

        } catch (e) {
            setLoading(false)
            console.log(e)
        }


    }

    useEffect((() => {
        (() => { getProduct() })()
    }), [])


    return (
        <> {loading
            ?
            <div className="flex h-full items-center w-full justify-center" ><Spin size="large" /></div>
            :
            <div className="flex flex-col w-full justify-center gap-12 p-12">
                 <Breadcrumb  items={[
                   {
                        href: '/',
                        title: (
                            <div className="flex flex-row h-full justify-center">
                                <Icon className="mr-2"  icon="ion:home-outline" height={16} />
                                <span>Lista de produtos</span>
                            </div>
                        ),
                    },
                    {
                        title: `${product?.title.substring(0,30)}...`,
                    }
                ]} />
                <div className="flex flex-row w-full justify-center gap-12 p-12">
                    <img className='h-96 w-96 object-contain' src={product?.image} alt='Error' />
                    <div className="flex flex-col w-5/12  gap-1 justify-between">
                        <span className="text-2xl">{product?.title}</span>
                        <span className="text-lg" >{product?.description}</span>
                        <span className="text-base">Categoria: {product?.category}</span>
                        <span className="text-base"> {product?.rating.count} Avaliações</span>
                        <Rate defaultValue={product?.rating.rate} />
                        <Button type="primary" block>Comprar</Button>

                    </div>



                </div>
            </div>
        }
        </>
    )
}