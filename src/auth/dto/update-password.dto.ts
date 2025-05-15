import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class UpdatePasswordDto {

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(/^(?=.*[A-ZÑ])(?=.*\d)(?=.*[@$!%*?&#.])[A-Za-zñÑ\d@$!%*?&#.]{12,}$/, {
      message: 'La contraseña debe tener al menos una letra mayúscula, un número y un carácter especial.'
    })
    nom_contrasena: string;

}