import express from "express";
const mascotasRouter = express.Router();
import sql from '../../config/database.js';

mascotasRouter.route('/').get(async (req, res) => {
    const mascotas = await sql`
select 
codigo_mas,
nombre_mas,
raza_mas,
color_mas,
peso_mas,
edad_mas,
enfermedades_mas,
ciudad_mas,
discapacidades_mas,
foto_mas,
id_ref	
from mascotas`
    res.render('mascotas/mascotas', { mascotas });
});

mascotasRouter.route('/create').get((req, res) => {
    res.render('mascotas/create', {});
});

mascotasRouter.route('/mascotas').get((req, res) => {
    res.render('mascotas/mascotas', {});
});

mascotasRouter.route('/store').post(async (req, res) => {
    const body = req.body;
    try {
        const resultado = await store(body);
        res.json(resultado);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar la mascota');
    }
});

mascotasRouter.route('/edit/:codigo_mas').get((req, res) => {
    const codigo_mas = req.params.codigo_mas;
    getMascotacodigo(codigo_mas).then((mascota) => {
        console.log(mascota)
        res.render('mascotas/edit', { mascota: mascota[0] });
    })

});

mascotasRouter.route('/update/:codigo_mas').post(async (req, res) => {
    const codigo_mas = req.params.codigo_mas
    const mascotas = await sql`
        update mascotas set
        ${sql(req.body,
        'nombre_mas',
        'raza_mas',
        'color_mas',
        'peso_mas',
        'edad_mas',
        'enfermedades_mas',
        'ciudad_mas',
        'discapacidades_mas',
        'foto_mas',
        )}
    where codigo_mas = ${codigo_mas};`;
    res.redirect('/mascotas')
   
})


export async function getMascotacodigo(codigo_mas) {
    const mascotas = await sql`
    select *
    from mascotas where codigo_mas = ${codigo_mas};`
        ;
    return mascotas;
}


export async function store(body) {
    const mascotas = await sql`
    insert into mascotas ${sql(body,
        'codigo_mas',
        'nombre_mas',
        'raza_mas',
        'color_mas',
        'peso_mas',
        'edad_mas',
        'enfermedades_mas',
        'discapacidades_mas',
        'ciudad_mas',
        'id_ref',
        'foto_mas')};`;
    console.log("mascota ingresada");
    return mascotas;

}
export default mascotasRouter;
