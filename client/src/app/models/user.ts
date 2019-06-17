import { PersonModel } from './person';

export interface UserModel extends PersonModel {

    city: string,
    street: string
}