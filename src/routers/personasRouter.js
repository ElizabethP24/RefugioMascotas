import express from "express";
const personasRouter = express.Router();
import sql from '../../config/database.js';

personasRouter.route('/').get(async(req, res) => {
    const personas = await sql`
select 
nombre_per,
cedula_per,
ocupacion_per,
ciudad_per,
direccion_per,
telefono_per,
correo_per,
foto_mas
from personas`
    res.render('personas/personas', { personas});
});

personasRouter.route('/create').get((req, res) => {
       res.render('personas/create',{});
});


personasRouter.route('/store').post(async (req, res) => {
    const body = req.body;
    try {
        const resultado = await store(body);
        res.json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar la persona');
    }
});
 
  export async function store(body) {
    const personas = await sql`
    insert into personas ${sql(body, 
        'nombre_per',
        'cedula_per',
        'ocupacion_per',
        'ingresos_per',
        'correo_per',
        'direccion_per',
        'ciudad_per',
        'telefono_per',       
        'foto_mas')};`;
        console.log("persona ingresada");
    return personas;
   
}

export default personasRouter;