  create table refugios (
  id_ref varchar(5)  PRIMARY KEY,
  nombre_ref varchar(250),
  nit_ref varchar(12),
  direccion_ref varchar(250),
  ciudad_ref varchar(250),
  telefono_ref varchar(250),
  correo_ref varchar(10)
 );

create table mascotas (
  codigo_mas varchar(20)  PRIMARY KEY,
  nombre_mas varchar(250),
  raza_mas varchar(250),
  color_mas varchar(250),
  peso_mas varchar(100),
  edad_mas varchar(50),
  enfermedades_mas varchar(250),
  discapacidades_mas varchar(250),
  ciudad_mas varchar(250),
  foto_mas varchar(250),
 id_ref varchar(5) REFERENCES refugios(id_ref) ON DELETE RESTRICT 
 );

 create table personas (
  cedula_per varchar(10) PRIMARY KEY,
  nombre_per varchar(250),
  ocupacion_per varchar(250),
  ingresos_per varchar(250),
  direccion_per varchar(250),
  ciudad_per varchar(250),
  telefono_per varchar(250),
  correo_per varchar(250),
  cantidad_per varchar(250)
  foto_mas varchar(250),
  );

create table solicitudes (
  id_sol varchar(5) PRIMARY KEY,
  fecha_sol date,
  id_ref varchar(5) REFERENCES refugios(id_ref) ON DELETE RESTRICT,
  codigo_mas varchar(20) REFERENCES mascotas(codigo_mas) ON DELETE RESTRICT, 
  cedula_per varchar(10) REFERENCES personas(cedula_per) ON DELETE RESTRICT,
  ciudad_sol varchar(250)
  );

INSERT INTO refugios (id_ref, nombre_ref, nit_ref, direccion_ref, ciudad_ref ,telefono_ref, correo_ref) VALUES ('01','HuellaAmiga', '900949000','cra21 #20-05','Manizales','3187654321','huellaamiga@gmail.com');

INSERT INTO mascotas (codigo_mas, nombre_mas,raza_mas, color_mas, peso_mas, edad_mas, enfermedades_mas, discapacidades_mas, ciudad_mas, foto_mas,id_ref) VALUES ('AZ01','Kira', 'Siames', 'Ceniza' ,'8 kg', '10 años', 'ninguna', 'ninguna', 'Manizales', 'img/price-1.jpg','1');

INSERT INTO personas (cedula_per, nombre_per,ocupacion_per, ingresos_per, direccion_per, ciudad_per, telefono_per, correo_per, cantidad_per, foto_mas ) VALUES ('1053860000','Brian', 'Mecánico', '$1.500.000' ,'cll 12 #3-45', 'Manizales','3197340000','brian88@gmail.com', '3', 'img/testimonial1.jpg');'$1'500.000' ,'cll 12 #3-45', '3197340000', '3', ' 'img/testimonial-3.jpg');