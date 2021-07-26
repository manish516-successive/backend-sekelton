export interface IDatabaseConfigAttributes {
	type: any,
   	host: string;
   	port: number | string,
   	username: string,
   	password: string,
   	database: string,
   	autoLoadEntities: boolean,
   	synchronize?: boolean
}