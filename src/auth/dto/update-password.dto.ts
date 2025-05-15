import { IsString, Matches, MaxLength, MinLength } from "class-validator";
import { CreateUserDto } from './create-user.dto';
import { PickType } from "@nestjs/mapped-types";

export class UpdatePasswordDto extends PickType(CreateUserDto, ['nom_contrasena'] as const){

    // @IsString()
    // @MinLength(6)
    // @MaxLength(50)
    // @Matches(/^(?=.*[A-ZÑ])(?=.*\d)(?=.*[@$!%*?&#.])[A-Za-zñÑ\d@$!%*?&#.]{12,}$/, {
    //   message: 'La contraseña debe tener al menos una letra mayúscula, un número y un carácter especial.'
    // })
    // nom_contrasena: string;

}