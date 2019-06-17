import { PersonModel } from './person';

export interface AdminModel extends PersonModel {

    role: number;
}