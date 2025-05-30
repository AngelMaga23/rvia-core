import { Transform } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

// Validador personalizado para el rango específico
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

export class CreateUserDto {

    @IsString()
    @IsEmail()
    @Matches(/^[^\s@]+@(coppel\.com|aforecoppel\.com|bancoppel\.com)$/, {
      message: 'El correo debe ser de un dominio válido: @coppel.com, @aforecoppel.com, @bancoppel.com.',
    })
    nom_correo: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(/^(?=.*[A-ZÑ])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])[A-Za-zñÑ\d!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{12,}$/, {
      message: 'La contraseña debe tener al menos una letra mayúscula, un número y un carácter especial.'
    })
    nom_contrasena: string;

    @IsString()
    @MinLength(1)
    @Transform(({ value }) => value.trim())
    @Matches(/^(?:[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:-[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)?|de|del|la|las|los|y)(?:\s+(?:[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:-[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)?|de|del|la|las|los|y)){1,}$/, {
      message: 'Escribe nombre completo, con al menos un nombre y un apellido, todos comenzando con letra mayúscula'
    })
    nom_usuario: string;

    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
    @Validate(IsExactLength)
    @Validate(IsInRange)
    num_empleado: string;

    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    idu_rol: number;

    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    num_puesto: number;

    // @IsNumber()
    // @Transform(({ value }) => parseInt(value, 10))
    // idu_aplicacion: number;

    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10))
    num_centro: number;

    @IsNumber()
    @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
    @IsOptional()
    // @Validate(IsExactLength)
    // @Validate(IsInRange)
    num_encargado: string;

    @IsOptional()
    fec_creacion?: Date;
  
    @IsOptional()
    fec_actualizacion?: Date; 

}
