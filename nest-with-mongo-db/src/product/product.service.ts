import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';


@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

    async createProduct(): Promise<Product> {
        const newProduct = new this.productModel({
            title: 'Sample Product',
            tags: [{ name: 'sample' }, { name: 'product' }]
        });
        return newProduct.save();
    }
    async getAllProducts(): Promise<Product[]> {
        return this.productModel.find().exec();
    }
}
