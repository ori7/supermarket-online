import { productCartModel } from './productCart';

export interface cartModel {
    _id: number,
    userId: number,
    createdDate: Date,
    status: string
}