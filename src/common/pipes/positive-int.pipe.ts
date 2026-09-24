import {
    BadRequestException,
    Injectable,
    PipeTransform,
  } from '@nestjs/common';
  
  @Injectable()
  export class PositiveIntPipe implements PipeTransform {
  
    transform(value: string) {
      const convertedValue = Number(value);
      if (
        Number.isInteger(convertedValue) &&
        convertedValue > 0
      ) {
        return convertedValue;
      }
      
      throw new BadRequestException('Value must be a positive integer');    }
  }