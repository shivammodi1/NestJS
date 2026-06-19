import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
    getCategory(){
        return ['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports & Outdoors'];
    }
}
