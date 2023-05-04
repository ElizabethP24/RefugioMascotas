import postgres from 'postgres';

const sql = postgres({
database: 'Proyecto_Refugio',
user: 'postgres',
password: 'admin'
});// will use psql environment variables

export default sql;
