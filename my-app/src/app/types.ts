
export type ItemsListType = ItemType[]

type RatingType = {
    rate: number,
    count: number
}

export type ItemType ={
    id: number,
    title: string,
    price: number,
    category: string,
    description: string,
    image: string
    rating: RatingType
}