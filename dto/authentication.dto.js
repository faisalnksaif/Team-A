import { IsDefined, IsIn, IsNotEmpty, IsString, ValidateIf } from "class-validator";
import { ValidateNested } from "../utils/util";
import { Doctor } from "./doctor.dto";
import { User } from "./user.dto";

export class RegistrationDto {
  @IsDefined()
  @ValidateNested(User)
  user;

  @ValidateIf((v) => v.user.role === "doctor")
  @ValidateNested(Doctor)
  doctor;
}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  username;

  @IsNotEmpty()
  @IsString()
  password;

  
  @IsIn(["patient", "doctor", "admin"])
 role
}
