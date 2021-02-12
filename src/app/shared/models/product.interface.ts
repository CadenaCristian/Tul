import { Category } from './category.interface'
export class Product {
    id?: string;
    name: string;
    description: string;
    category: Category;
    price: string;
}