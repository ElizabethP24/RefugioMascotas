import express from "express";
const solicitudesRouter = express.Router();
import sql from '../../config/database.js';

solicitudesRouter.route('/').get(async (req, res) => {
    const solicitudes = await sql`
select 
id_sol,
fecha_sol,
id_ref,
codigo_mas,
cedula_per,
ciudad_sol,
estado
from solicitudes`
    res.render('solicitudes/solicitudes', { solicitudes});
});

solicitudesRouter.route('/create').get((req, res) => {
    res.render('solicitudes/create', {});
});

solicitudesRouter.route('/solicitudes').get((req, res) => {
    res.render('solicitudes/solicitudes', {});
});
solicitudesRouter.route('/lista').get(async (req, res) => {
    const solicitudes = await sql`
    select 
    id_sol,
    fecha_sol,
    id_ref,
    codigo_mas,
    cedula_per,
    ciudad_sol,
    estado
    from solicitudes`
    res.render('solicitudes/list_solicitudes', { solicitudes });
});

solicitudesRouter.route('/store').post(async (req, res) => {
    const body = req.body;
    try {
        const resultado = await store(body);
        res.redirect('/solicitudes/create')
    } catch (error) {r
        console.error(error);
        res.status(500).send('Error al guardar la solicitud');
    }
   
});

solicitudesRouter.route('/edit/:id_sol').get((req, res) => {
    const id_sol = req.params.id_sol;
    getIdSolicitud(id_sol).then((solicitud) => {
        console.log(solicitud)
        res.render('solicitudes/edit', { solicitud: solicitud[0] });
    })

});

solicitudesRouter.route('/delete/:id_sol').post((req, res) => {
    const id_sol = req.params.id_sol;
    getIdSolicitud(id_sol).then(async(solicitud) => {
        const id_sol = req.params.id_sol;
        await sql`DELETE FROM solicitudes WHERE id_sol = ${id_sol}`;
        res.redirect('/solicitudes/lista');
    })
});


solicitudesRouter.route('/update/:id_sol').post(async (req, res) => {
    const id_sol = req.params.id_sol
    const solicitudes = await sql`
        update solicitudes set
        ${sql(req.body,
            'id_sol',
            'fecha_sol',
            'id_ref',
            'codigo_mas',
            'cedula_per',
            'ciudad_sol',
            'estado',
        )}
    where id_sol = ${id_sol};`;
    res.redirect('/solicitudes/lista')
   
})

export async function getIdSolicitud(id_sol) {
    const solicitudes = await sql`
    select *
    from solicitudes where id_sol = ${id_sol};`
        ;
    return solicitudes;
}


export async function store(body) {
    const solicitudes = await sql`
    insert into solicitudes ${sql(body,
        'id_sol',
        'fecha_sol',
        'id_ref',
        'codigo_mas',
        'cedula_per',
        'ciudad_sol',
        'estado')};`;
    console.log("solicitud ingresada");
    return solicitudes;

}
export default solicitudesRouter;
