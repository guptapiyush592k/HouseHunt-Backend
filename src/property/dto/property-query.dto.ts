import { Type } from 'class-transformer';
import {
    Equals,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class PropertyQueryDto{
    @IsOptional()
    @IsString()
    city?: string;
  
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    bedrooms?: number;
  
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    maxRent?: number;

    @IsOptional()
    @IsString()
    locality?: string;

    @IsOptional()
    @IsString()
    type?: string;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    minRent?: number;

    @IsOptional()
    @Equals('rent')
    sortBy?: string;

    @IsOptional()
    @IsIn(['asc' , 'desc'])
    order?: 'asc' | 'desc'

    @IsOptional()
    @Type(()=>Number)
    @IsInt()
    @Min(1)
    page:number = 1

    @IsOptional()
    @Type(()=>Number)
    @IsInt()
    @Min(1)
    limit:number = 10
}