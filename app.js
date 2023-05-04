import express from 'express';
import chalk from 'chalk';
import morgan from 'morgan';
import debug from 'debug';
import path, { dirname} from 'path';
import mascotas from './src/data/mascotas.json' assert {type: "json"};
import personas from './src/data/personas.json' assert {type: "json"};
import mascotasRouter from './src/routers/mascotasRouter.js';
import personasRouter from './src/routers/personasRouter.js';
import sql from './config/database.js';
//import nodemon from './src/nodemon.js';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const debugApp = debug('app');
const app = express()
const PORT = process.env.PORT || 3000

const mascotaRouter = express.Router();

app.use(express.static(path.join(dirname('.'),'/public/')));
app.use(morgan('tiny'));
app.use(express.urlencoded({extended: false}));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/mascotas', mascotasRouter)
app.use('/personas', personasRouter)

 
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/blog', (req, res) => {
  res.render('blog');
});

app.get('/servicios', (req, res) => {
  res.render('servicios');
});

app.listen(5000, () => {
  debugApp(`Listening on port ${chalk.green(PORT)}`);
});
       
async function getMascotas(id){
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

  getMascotas(1).then(mascotas=> {
    debugApp(mascotas);
  });

  async function getPersonas(id){
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
  
    getPersonas(1).then(personas=> {
      debugApp(personas);
    });

    
