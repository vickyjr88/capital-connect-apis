import { DataSource } from 'typeorm';
import { User } from './src/users/user.entity';
import { config } from 'dotenv';

config(); // Load .env file

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User],
  migrations: ['dist/src/migrations/*.js'],
});

export default dataSource;
