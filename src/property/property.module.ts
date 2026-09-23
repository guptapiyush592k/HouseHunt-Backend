import { Module } from '@nestjs/common';
import { PropertyController } from './propert.controller.js';
import { PropertyService } from './property.service.js';

@Module({
    exports:[],
    controllers:[PropertyController],
    providers: [PropertyService],
})
export class PropertyModule {}