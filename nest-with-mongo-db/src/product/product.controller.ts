import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(@Inject(ProductService) private productService: ProductService) {}

    @Post('createProduct')
    async createProduct() {
        return this.productService.createProduct();
    }

    @Get('getAllProducts')
    async getAllProducts() {
        return this.productService.getAllProducts();
    }
}
