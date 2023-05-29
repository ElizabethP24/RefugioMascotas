import express from "express";
const refugiosRouter = express.Router(); // Cambia personasRouter por refugiosRouter
import sql from '../../config/database.js';

refugiosRouter.route('/').get(async (req, res) => {
    const refugios = await sql`
        select 
            id_ref,
            nombre_ref,
            direccion_ref,
            ciudad_ref,
            telefono_ref,
            correo_ref,
            nit_ref,
            username,
            password
        from refugios`;
    res.render('refugios/refugios', { refugios });
});

refugiosRouter.route('/create').get((req, res) => {
    res.render('refugios/create', {});
});

refugiosRouter.route('/store').post(async (req, res) => {
    const body = req.body;
    try {
        const resultado = await store(body);
        res.redirect('/index')
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar el refugio');
    }
   
});

export async function store(body) {
    console.log(body);
    const refugios = await sql`
    insert into refugios ${sql(body,
        'id_ref',
        'nombre_ref',
        'nit_ref',
        'direccion_ref',
        'ciudad_ref',
        'correo_ref',
        'telefono_ref',
        'username',
        'password')};`;
    console.log("refugio ingresado");
    return refugios;
    }


    refugiosRouter.route('/lista').get(async (req, res) => {
        const refugios = await sql`
    select 
    id_ref,
    nombre_ref,
    nit_ref,
    direccion_ref,
    ciudad_ref,
    correo_ref,
    telefono_ref,
    username,
    password
    from refugios`
        res.render('refugios/list_refugio', { refugios });
        console.log(refugios);
    });

    refugiosRouter.route('/edit/:id_ref').get((req, res) => {
        const id_ref = req.params.id_ref;
        getIdRefugio(id_ref).then((refugio) => {
            console.log(refugio)
            res.render('refugios/edit', { refugio: refugio[0] });
        })
    
    });
    
    export async function getIdRefugio(id_ref) {
        const refugios= await sql`
        select *
        from refugios where id_ref = ${id_ref};`
            ;
        return refugios;
    }
        
    refugiosRouter.route('/delete/:id_ref').post((req, res) => {
        const id_ref = req.params.id_ref;
        getIdRefugio(id_ref).then(async(refugio) => {
            const id_ref = req.params.id_ref;
            await sql`DELETE FROM refugios WHERE id_ref = ${id_ref}`;
            res.redirect('/refugios/lista');
        })
    }); 
    
        refugiosRouter.route('/update/:id_ref').post(async (req, res) => {
        const id_ref = req.params.id_ref
        const refugios = await sql`
            update refugios set
            ${sql(req.body,
            'id_ref',
            'nombre_ref',
            'nit_ref',
            'direccion_ref',
            'ciudad_ref',
            'correo_ref',
            'telefono_ref',
            'username',
            'password'
            )}
        where id_ref = ${id_ref};`;
        res.redirect('/refugios/lista')
       
    });
export default refugiosRouter; // Agrega esta línea para exportar refugiosRouter
