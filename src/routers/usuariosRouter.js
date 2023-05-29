import express from "express";
const usuariosRouter = express.Router();
import sql from '../../config/database.js';

usuariosRouter.route('/').get(async (req, res) => {
    const usuarios = await sql`
select 
id_usuario,
nombre_usuario,
cedula_usuario,
username,
password,
rol
from usuarios`
    res.render('usuarios/lista', { usuarios});
});

usuariosRouter.route('/create').get((req, res) => {
    res.render('usuarios/create', {});
});

usuariosRouter.route('/lista').get(async (req, res) => {
    const usuarios = await sql`
    select 
    id_usuario,
    nombre_usuario,
    cedula_usuario,
    username,
    password,
    rol
    from usuarios`
    res.render('usuarios/list_usuarios', { usuarios});
});

usuariosRouter.route('/store').post(async (req, res) => {
    const body = req.body;
    try {
        const resultado = await store(body);
        res.redirect('/usuarios/create')
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al guardar usuario');
    }
   
});

usuariosRouter.route('/edit/:id_usuario').get((req, res) => {
    const id_usuario = req.params.id_usuario;
    getIdUsuario(id_usuario).then((usuario) => {
        console.log(usuario)
        res.render('usuarios/edit', { usuario: usuario[0] });
    })

});

usuariosRouter.route('/delete/:id_usuario').post((req, res) => {
    const id_usuario = req.params.id_usuario;
    getIdUsuario(id_usuario).then(async(usuario) => {
        const id_usuario = req.params.id_usuario;
        await sql`DELETE FROM usuarios WHERE id_usuario= ${id_usuario}`;
        res.redirect('/usuarios/lista');
    })
});


usuariosRouter.route('/update/:id_usuario').post(async (req, res) => {
    const id_usuario = req.params.id_usuario
    const usuarios = await sql`
        update usuarios set
        ${sql(req.body,
            'id_usuario',
            'nombre_usuario',
            'cedula_usuario',
            'username',
            'password',
            'rol'
        )}
    where id_usuario = ${id_usuario};`;
    res.redirect('/usuarios/lista')
   
})

export async function getIdUsuario(id_usuario) {
    const usuarios = await sql`
    select *
    from usuarios where id_usuario = ${id_usuario};`
        ;
    return usuarios;
}


export async function store(body) {
    const usuarios = await sql`
    insert into usuarios ${sql(body,
        'id_usuario',
        'nombre_usuario',
        'cedula_usuario',
        'username',
        'password',
        'rol')};`;
    console.log("usuario ingresado");
    return usuarios;

}
export default usuariosRouter;
