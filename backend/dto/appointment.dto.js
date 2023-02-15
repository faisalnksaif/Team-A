import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";

export class appointmentDto {
    @IsNotEmpty()
    @IsString()
    name

    @IsNotEmpty()
    @IsNumber()
    age

    @IsNotEmpty()
    @IsString()
    gender

    @IsNotEmpty()
    @IsString()
    place

    @IsNotEmpty()
    @IsString()
    maritalStatus

    @IsNotEmpty()
    @IsPhoneNumber()
    contactNo

    @IsNotEmpty()
    @IsString()
    appointmentFor

    @IsNotEmpty()
    @IsString()
    date


}