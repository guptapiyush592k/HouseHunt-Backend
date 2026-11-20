
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './user/user.entity.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  username: 'piyush',
  password: '',
  database: 'flat_hunt',
  entities: [User],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
