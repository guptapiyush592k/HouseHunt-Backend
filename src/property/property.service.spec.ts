import { NotFoundException } from '@nestjs/common';
import { PropertyService } from './property.service.js';

describe('PropertyService', () => {
  let service: PropertyService;

  beforeEach(() => {
    service = new PropertyService();
  });

  it('should return property when property exists', () => {
    const result = service.getProperty('111');

    expect(result).toBeDefined();
    expect(result.id).toBe('111');
  });

  it('should return error when property not exist', () => {
    expect(() => {
        service.getProperty('2345');
      }).toThrow(NotFoundException);
  });

  it('should delete property then return error when call get property', () => {
    service.deleteProperty('111');
    expect(() => {
        service.getProperty('111');
      }).toThrow(NotFoundException);
  });

  it('should return error when property not exist while deleting it', () => {
    expect(() => {
        service.deleteProperty('2345');
      }).toThrow(NotFoundException);
  });
});