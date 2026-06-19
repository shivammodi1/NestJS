import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from '../product/product.service';

@Controller('user')
export class UserController {
    // Injecting ProductService to use its methods in UserController
    constructor(private productService: ProductService) {}

    @Get()
    getUser(): { string: string; number: number } {
        return {string: 'Hello User', number: 44};
    }

    // Endpoint to get all products using ProductService
    @Get('products')
    getProducts(){
        return this.productService.getAllProducts();
    }
    // Endpoint to get a product by ID using ProductService
    @Get('products/:id')
    getProductById(@Param('id') id: number){
        return this.productService.getProductById((Number(id)));
    }
}
