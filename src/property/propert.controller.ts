import { Body, Controller, Get, Param, Post, Query, Patch, Delete } from "@nestjs/common";
import { PropertyService } from "./property.service.js";
import { CreatePropertyDto } from "./dto/create-property.dto.js";
import { UpdatePropertyDto } from "./dto/update-property.dto.js";

@Controller('properties')
export class PropertyController{

    constructor(private readonly propertyService:PropertyService){}

    @Get()
    getAllProperties(
        @Query('city') city: string,
        @Query('bedrooms') bedrooms: string,
        @Query('maxRent') maxRent: string,
    ){
        return this.propertyService.getAllProperties()
    }

    @Get(':id')
    getProperty(
      @Param('id') id: string
    ) {
      return this.propertyService.getProperty(id);
    }

    @Post()
    createProperty(
        @Body() body: CreatePropertyDto
    ){
        return this.propertyService.addProperty(body)
    }

    @Patch(':id')
    updateProperty(
    @Param('id') id: string,
    @Body() body: UpdatePropertyDto,
    ) {
    return this.propertyService.updateProperty(id, body)
    }

    @Delete(':id')
    deleteProperty(
        @Param('id') id: string,
    ){
        return 'Property deleted '+id
    }
}