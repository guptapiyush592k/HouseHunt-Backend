import { Injectable, NotFoundException } from "@nestjs/common";
import { Property } from "./interface/property.interface.js";
import { v4 as uuidv4 } from 'uuid';
import { CreatePropertyDto } from "./dto/create-property.dto.js";
import { UpdatePropertyDto } from "./dto/update-property.dto.js";
import { PropertyQueryDto } from "./dto/property-query.dto.js";

@Injectable()
export class PropertyService {
    private readonly properties: Property[] = [
        {
            id: "111",
            name: "Piyush flat",
            type: "Individual Flat",
            bedrooms: 2,
            city: 'Delhi',
            locality: 'IFFCO chowk',
            available: true,
            ownerId: '222',
            rent: 20000
        },
        {
            id: "222",
            name: "Ritik flat",
            type: "Individual Flat",
            bedrooms: 1,
            city: 'Gurgaon',
            locality: 'IFFCO chowk',
            available: true,
            ownerId: '444',
            rent: 23000
        },
        {
            id: "333",
            name: "Preeti flat",
            type: "Individual Flat",
            bedrooms: 4,
            city: 'Gurgaon',
            locality: 'IFFCO chowk',
            available: true,
            ownerId: '444',
            rent: 27000
        }, {
            id: "444",
            name: "Shivam flat",
            type: "Individual Flat",
            bedrooms: 2,
            city: 'Gurgaon',
            locality: 'IFFCO chowk',
            available: true,
            ownerId: '444',
            rent: 22000
        },
        {
            id: "555",
            name: "Piyush flat",
            type: "Individual Flat",
            bedrooms: 2,
            city: 'Delhi',
            locality: 'IFFCO chowk',
            available: true,
            ownerId: '222',
            rent: 29000
        },
        {
            id: "666",
            name: "Ritik flat",
            type: "Individual Flat",
            bedrooms: 1,
            city: 'Gurgaon',
            locality: 'IFFCO chowk',
            available: true,
            ownerId: '444',
            rent: 23700
        },
        {
            id: "777",
            name: "Preeti flat",
            type: "Individual Flat",
            bedrooms: 4,
            city: 'Gurgaon',
            locality: 'IFFCO chowk',
            available: true,
            ownerId: '444',
            rent: 30000
        }, {
            id: "888",
            name: "Shivam flat",
            type: "Individual Flat",
            bedrooms: 2,
            city: 'Gurgaon',
            locality: 'IFFCO chowk',
            available: true,
            ownerId: '444',
            rent: 12000
        }, {
            id: "999",
            name: "Piyush flat",
            type: "Individual Flat",
            bedrooms: 2,
            city: 'Delhi',
            locality: 'IFFCO chowk',
            available: true,
            ownerId: '222',
            rent: 25000
        },
        {
            id: "1000",
            name: "Ritik flat",
            type: "Individual Flat",
            bedrooms: 1,
            city: 'Gurgaon',
            locality: 'IFFCO chowk',
            available: true,
            ownerId: '444',
            rent: 29000
        },
        {
            id: "1100",
            name: "Preeti flat",
            type: "Individual Flat",
            bedrooms: 4,
            city: 'Gurgaon',
            locality: 'IFFCO chowk',
            available: true,
            ownerId: '444',
            rent: 35000
        }, {
            id: "1200",
            name: "Shivam flat",
            type: "Individual Flat",
            bedrooms: 2,
            city: 'Gurgaon',
            locality: 'IFFCO chowk',
            available: true,
            ownerId: '444',
            rent: 37000
        }
    ]

    getAllProperties(query: PropertyQueryDto) {
        let filteredProperties = this.properties;
        const { city, bedrooms, maxRent, locality, type, minRent, sortBy, order, page, limit } = query;
        let startingIndex = 0


        startingIndex = (page - 1) * limit



        if (city) {
            filteredProperties = filteredProperties.filter(
                prop => prop.city.toLowerCase() === city.toLowerCase()
            );
        }

        if (bedrooms) {
            filteredProperties = filteredProperties.filter(
                prop => prop.bedrooms === bedrooms
            );
        }

        if (maxRent) {
            filteredProperties = filteredProperties.filter(
                prop => prop.rent <= maxRent
            );
        }

        if (locality) {
            filteredProperties = filteredProperties.filter(
                prop => prop.locality.toLowerCase().includes(locality.toLowerCase())
            );
        }

        if (type) {
            filteredProperties = filteredProperties.filter(
                prop => prop.type.toLowerCase() === type.toLowerCase()
            );
        }

        if (minRent) {
            filteredProperties = filteredProperties.filter(
                prop => prop.rent >= minRent
            );
        }

        const filteredSortedProperties = [...filteredProperties]
        if (sortBy) {
            if (order && order === 'desc') {
                filteredSortedProperties.sort((a, b) => b.rent - a.rent)
            } else {
                filteredSortedProperties.sort((a, b) => a.rent - b.rent)
            }
        }

        const propertiesToReturn = filteredSortedProperties.slice(startingIndex, startingIndex + limit)

        return {
            data: propertiesToReturn,
            "pagination": {
                "page": page,
                "limit": limit,
                "total": filteredSortedProperties.length
            }
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

    updateProperty(id: string, body: UpdatePropertyDto) {
        const propertyToUpdateIndex = this.properties.findIndex(prop => prop.id === id)
        if (propertyToUpdateIndex === -1) {
            throw new NotFoundException('Property not found');
        }
        const updatedProperty = { ...this.properties[propertyToUpdateIndex], ...body }
        this.properties[propertyToUpdateIndex] = updatedProperty
        return updatedProperty
    }

    deleteProperty(id: string) {
        const propertyToDeleteIndex = this.properties.findIndex(prop => prop.id === id)
        if (propertyToDeleteIndex === -1) {
            throw new NotFoundException('Property not found');
        }
        this.properties.splice(propertyToDeleteIndex, 1)
        return
    }


}