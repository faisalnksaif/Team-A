import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
  validateSync,
} from "class-validator";
import { plainToClass } from "class-transformer";
const mobileNumberRegex =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

export function isValidMobileNumber(value) {
  // console.log('mobile number', value)
  return mobileNumberRegex.test(value);
}

export function ValidateNested(schema, validationOptions) {
  return function (object, propertyName) {
    registerDecorator({
      name: "ValidateNested",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value, args) {
          args.value;
          if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
              if (validateSync(plainToClass(schema, value[i])).length) {
                return false;
              }
            }
            return true;
          } else
            return validateSync(plainToClass(schema, value)).length
              ? false
              : true;
        },
        defaultMessage(args) {
          if (Array.isArray(args.value)) {
            for (let i = 0; i < args.value.length; i++) {
              return (
                `${args.property}::index${i} -> ` +
                validateSync(plainToClass(schema, args.value[i]))
                  .map((e) => e.constraints)
                  .reduce((acc, next) => acc.concat(Object.values(next)), [])
              ).toString();
            }
          } else
            return (
              `${args.property}: ` +
              validateSync(plainToClass(schema, args.value))
                .map((e) => e.constraints)
                .reduce((acc, next) => acc.concat(Object.values(next)), [])
            ).toString();
        },
      },
    });
  };
}
