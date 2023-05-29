import express from 'express';
import chalk from 'chalk';
import morgan from 'morgan';
import debug from 'debug';
import path, { dirname } from 'path';
import mascotas from './src/data/mascotas.json' assert {type: "json"};
import personas from './src/data/personas.json' assert {type: "json"};
import refugios from './src/data/refugios.json' assert {type: "json"};
import perfil from './src/data/perfil.json' assert {type: "json"};
import mascotasRouter from './src/routers/mascotasRouter.js';
import personasRouter from './src/routers/personasRouter.js';
import refugiosRouter from './src/routers/refugiosRouter.js';
import solicitudesRouter from './src/routers/solicitudesRouter.js';
import usuariosRouter from './src/routers/usuariosRouter.js';
import perfilRouter from './src/routers/perfilRouter.js';
import sql from './config/database.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passportConfig from './config/passport.js';
import passport from 'passport';

//import nodemon from './src/nodemon.js';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const debugApp = debug('app');
const app = express()
const PORT = process.env.PORT || 3000

const mascotaRouter = express.Router();

app.use(express.static(path.join(dirname('.'), '/public/')));
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'segurity' }));

app.set('views', './src/views');
app.set('view engine', 'ejs');

passportConfig(app);

app.use('/mascotas', mascotasRouter)
app.use('/personas', personasRouter)
app.use('/refugios', refugiosRouter)
app.use('/solicitudes', solicitudesRouter)
app.use('/perfil', perfilRouter)
app.use('/usuarios', usuariosRouter)

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/registro', (req, res) => {
  res.render('registro');
});

app.get('/blog', (req, res) => {
  res.render('blog');
});



app.get('/servicios', (req, res) => {
  res.render('servicios');
});

app.route('/ingresar').post((req,res,next) => {
  console.log(req.body);
  passport.authenticate('local', {
    successReturnToOrRedirect: '/perfil',
    failureRedirect: '/login',
    keepSessionInfo: true
  })(req,res,next);
});


export async function getPersonaUsuario(username) {
  const personas = await sql`
    SELECT *
    FROM personas
    WHERE username = ${username};`;

  return personas[0] || null;
}

export async function getRefugioUsuario(username) {
  const refugios = await sql`
    SELECT *
    FROM refugios
    WHERE username = ${username};`;

  return refugios[0] || null;
}


app.listen(5000, () => {
  debugApp(`Listening on port ${chalk.green(PORT)}`);
});

async function getMascotas(id) {
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
  return mascotas
}

getMascotas(1).then(mascotas => {
  debugApp(mascotas);
});

async function getPersonas(id) {
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
  return personas
}

getPersonas(1).then(personas => {
  debugApp(personas);
});


async function getRefugios(nit_ref) {
  const refugios = await sql`
      select 
      nombre_ref,
      direccion_ref,
      ciudad_ref,
      telefono_ref,
      correo_ref,
      nit_ref,
      username,
      password
      from refugios`
  return refugios
}

getRefugios(1).then(refugios => {
  debugApp(refugios);
});


