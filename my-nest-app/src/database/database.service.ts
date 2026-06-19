import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
    private isConnected: boolean = false;

    // jab service load hogi toh ye method call hoga
    onModuleInit(){
        this.isConnected = true;
        console.log('Database connected successfully!');
    }

    // jab application shutdown hoga toh ye method call hoga
    // isme 1 signal pass hoti hai jo ki shutdown ke reason ko batati hai
    onApplicationShutdown( signal: string ){
        this.isConnected = false;
        console.log('Database connection closed!' + signal);
    }

    getStatus(){
        return this.isConnected ? 'Database is connected' : 'Database is not connected';
    }

}
