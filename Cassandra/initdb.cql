CREATE KEYSPACE keyspace1
  WITH REPLICATION = { 
   'class' : 'SimpleStrategy', 
   'replication_factor' : 2 
};

CREATE KEYSPACE keyspace2
  WITH REPLICATION = { 
   'class' : 'SimpleStrategy', 
   'replication_factor' : 3
};

CREATE TABLE keyspace1.pacientes(
    id UUID, 
    nombre text,
    apellido text,
    rut text,
    email text,
    fecha_nacimiento text,
    PRIMARY KEY(id,rut)
);

CREATE TABLE keyspace2.recetas(
    id UUID PRIMARY KEY, 
    id_paciente UUID,
    comentario text,
    farmacos text,
    doctor text
);