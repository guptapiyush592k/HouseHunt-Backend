import {
    IsString,
    IsNumber,
    IsBoolean,
    IsNotEmpty,
    Min,
} from 'class-validator';

export class CreatePropertyDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsNumber()
    @Min(1)
    bedrooms: number;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    locality: string;

    @IsString()
    @IsNotEmpty()
    ownerId: string;

    @IsNumber()
    @Min(1)
    rent: number;

    @IsBoolean()
    available: boolean;
}