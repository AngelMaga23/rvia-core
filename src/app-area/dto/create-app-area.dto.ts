import { IsString, MinLength } from "class-validator";

export class CreateAppAreaDto {

    @IsString()
    @MinLength(1)
    nom_aplicacion: string;

}
