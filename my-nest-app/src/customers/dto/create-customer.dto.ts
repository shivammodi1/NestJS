
//  ! -> agar ! kuse rte haii iska matlab h ki property required hai, but baad me assign hogi
// ? -> agar ? use krte haii iska matlab h ki property optional hai, aur baad me assign ho skti h

import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsInt()
    @IsNotEmpty()
    age!: number;
}