import {  IsDefined, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, ValidateIf, ValidateNested, } from "class-validator";

export class DoctorUpdate {
  @IsNotEmpty()
  @IsString()
  department;

  @IsNotEmpty()
  @IsString()
  timeStart;

  @IsNotEmpty()
  @IsString()
  timeEnd;

  @IsNotEmpty()
  @IsString()
  qualification;

  @IsNotEmpty()
  @IsString()
  yearofExperience;
}


export class UserUpdate{
    @IsNotEmpty()
    @IsString()
    username;
  
    @IsNotEmpty()
    @IsString()
    name;
  
    @IsNotEmpty()
    @IsString()
    address;
  
    @IsPhoneNumber()
    mobileNo;
  
    @IsEmail()
    email;
  
}


export class updationDto{
    @IsDefined()
    @ValidateNested(UserUpdate)
    user;
  
    @ValidateIf((v) => user.role === "doctor")
    @ValidateNested(DoctorUpdate)
    doctor;
}