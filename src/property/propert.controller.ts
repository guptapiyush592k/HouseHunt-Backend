import { Body, Controller, Get, Param, Post, Query, Patch, Delete, HttpCode, HttpStatus, UseGuards, UseInterceptors } from "@nestjs/common";
import { PropertyService } from "./property.service.js";
import { CreatePropertyDto } from "./dto/create-property.dto.js";
import { UpdatePropertyDto } from "./dto/update-property.dto.js";
import { PropertyQueryDto } from "./dto/property-query.dto.js";
import { ApiKeyGuard } from "../common/guards/api-key.guard.js";
import { LoggingInterceptor } from "../common/interceptors/logging.interceptor.js";

@UseGuards(ApiKeyGuard)
@UseInterceptors(LoggingInterceptor)
@Controller('properties')
export class PropertyController {

    constructor(private readonly propertyService: PropertyService) { }

    @Get()
    getAllProperties(
        @Query() query: PropertyQueryDto
    ) {
        return this.propertyService.getAllProperties(query)
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
    ) {
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
    @HttpCode(HttpStatus.NO_CONTENT)
    deleteProperty(
        @Param('id') id: string,
    ) {
        return this.propertyService.deleteProperty(id)
    }
}