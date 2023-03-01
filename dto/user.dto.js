import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsPhoneNumber,
  IsIn,
} from "class-validator";

export class User {
  @IsNotEmpty({message:"username is required"})
  @IsString()
  username;

  @IsNotEmpty({message:"password is required"})
  @IsString()
  @MinLength(6)
  password;

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

  @IsIn(["patient", "doctor", "admin"])
  role;
}
