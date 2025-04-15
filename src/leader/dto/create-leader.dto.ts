import { Transform } from "class-transformer";
import { IsNumber, IsString, MinLength, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";


@ValidatorConstraint({ name: 'isInRange', async: false })
class IsInRange implements ValidatorConstraintInterface {
  validate(value: number, args: ValidationArguments): boolean {
    return value >= 90000000 && value < 100000000;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'El valor debe estar entre 90,000,000 and 100,000,000';
  }
}

// Validador personalizado para la longitud del número
@ValidatorConstraint({ name: 'isExactLength', async: false })
class IsExactLength implements ValidatorConstraintInterface {
  validate(value: number, args: ValidationArguments): boolean {
    return value.toString().length === 8;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'Number must be exactly 8 digits long';
  }
}

export class CreateLeaderDto {

    @IsString()
    @MinLength(1)
    nom_empleado: string;

    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
    @Validate(IsExactLength)
    @Validate(IsInRange)
    num_empleado: number;


    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    num_puesto: number;
}
