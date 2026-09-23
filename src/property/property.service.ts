import { Injectable, NotFoundException } from "@nestjs/common";
import { Property } from "./interface/property.interface.js";
import { v4 as uuidv4 } from 'uuid';
import { CreatePropertyDto } from "./dto/create-property.dto.js";
import { UpdatePropertyDto } from "./dto/update-property.dto.js";

@Injectable()
export class PropertyService {
    private readonly properties: Property[] = [
        {
            id: "111",
            name: "Piyush flat",
            type: "Individual Flat",
            bedrooms: 2,
            city: 'Gurgaon',
            locality: 'IFFCO chowk',
            available: true,
            ownerId: '222',
            rent: 20000
        },
        {
            id: "333",
            name: "Piyush flat",
            type: "Individual Flat",
            bedrooms: 2,
            city: 'Gurgaon',
            locality: 'IFFCO chowk',
            available: true,
            ownerId: '444',
            rent: 20000
        }
    ]

    getAllProperties() {
        return {
            data: this.properties
        };
    }

    getProperty(id: string) {
        let property: Property | undefined = this.properties.find(prop => {
            return prop.id === id
        })
        if (!property) {
            throw new NotFoundException('Property not found');
        }

        return property;
    }

    addProperty(data: CreatePropertyDto) {
        const id = uuidv4();

        const dataToAdd: Property = { ...data, id }
        this.properties.push(dataToAdd)
        return dataToAdd
    }

    updateProperty(id:string, body:UpdatePropertyDto){
        const propertyToUpdateIndex = this.properties.findIndex(prop=>prop.id === id)
        if(propertyToUpdateIndex === -1){
            throw new NotFoundException('Property not found');
        }
        const updatedProperty = {...this.properties[propertyToUpdateIndex], ...body}
        this.properties[propertyToUpdateIndex] = updatedProperty
        return updatedProperty
    }


}