import { Transform } from "class-transformer";
import { IsNumber, IsString, MinLength } from "class-validator";

export class CreateCentroDto {

    @IsString()
    @MinLength(1)
    nom_centro: string;

    @IsNumber()
    @Transform(({ value }) => parseInt(value, 6))
    num_centro: number;

}
