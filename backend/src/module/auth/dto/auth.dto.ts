import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class NewUser {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password_hash: string;

    @IsNotEmpty()
    @IsNumber()
    role_id: number;
}