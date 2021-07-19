 export const DATABASE_CONFIG = {
    type: process.env.DATABASE_TYPE as any,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT) || 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: (process.env.DATABASE_SYNCHRONIZE === 'true')
}

