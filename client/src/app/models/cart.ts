import { productCartModel } from './productCart';

export interface cartModel {
    id: number,
    userId: number,
    products: productCartModel[],
    createdDate: Date
}