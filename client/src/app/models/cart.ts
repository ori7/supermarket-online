import { productCartModel } from './productCart';

export interface cartModel {
    _id: number,
    userId: number,
    products: productCartModel[],
    createdDate: Date
}