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
            req.login(resultado[0],() => {
            res.redirect('/personas/profile');
    }); 
        }catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar la persona');
    }
});

personasRouter.route('/profile').get ((req, res) => {
    res.json(req.user);
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
        'foto_mas',
        'username')}
        returning username;`;
        console.log("persona ingresada");
    return personas;
   
}

personasRouter.route('/lista').get(async (req, res) => {
    const personas = await sql`
select 
cedula_per,
nombre_per,
ocupacion_per,
ingresos_per,
direccion_per,
ciudad_per,
telefono_per,
correo_per,
cantidad_per,
foto_mas
from personas`
    res.render('personas/list_personas', { personas });
    console.log(personas);
});

personasRouter.route('/edit/:cedula_per').get((req, res) => {
    const cedula_per = req.params.cedula_per;
    getPersonacedula(cedula_per).then((persona) => {
        console.log(persona)
        res.render('personas/edit', { persona: persona[0] });
    })

});

export async function getPersonacedula(cedula_per) {
    const personas= await sql`
    select *
    from personas where cedula_per = ${cedula_per};`
        ;
    return personas;
}

personasRouter.route('/delete/:cedula_per').post((req, res) => {
    const cedula_per = req.params.cedula_per;
    getPersonacedula(cedula_per).then(async(persona) => {
        const cedula_per = req.params.cedula_per;
        await sql`DELETE FROM personas WHERE cedula_per = ${cedula_per}`;
        res.redirect('/personas/lista');
    })
});

    personasRouter.route('/update/:cedula_per').post(async (req, res) => {
    const cedula_per = req.params.cedula_per
    const personas = await sql`
        update personas set
        ${sql(req.body,
        'cedula_per',
        'nombre_per',
        'ocupacion_per',
        'ingresos_per',
        'direccion_per',
        'ciudad_per',
        'telefono_per',
        'correo_per',
        'foto_mas',
        )}
    where cedula_per = ${cedula_per};`;
    res.redirect('/personas/lista')
   
})
export default personasRouter;