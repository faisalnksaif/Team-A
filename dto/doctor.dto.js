import { IsIn, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class Doctor {
  // @IsNotEmpty()
  // @IsString()
  // department;

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
