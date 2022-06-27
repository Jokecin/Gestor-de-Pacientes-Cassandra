const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');
const cassandra = require('cassandra-driver');
const host = process.env.HOST_IP 
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

var PlainTextAuthProvider = cassandra.auth.PlainTextAuthProvider;

const client = new cassandra.Client({
    contactPoints: ['cassandra1', 'cassandra2', 'cassandra3'],
    localDataCenter: 'datacenter1',
    keyspace: 'keyspace1',
    authProvider: new PlainTextAuthProvider('cassandra', 'cassandra'),
})

const client2 = new cassandra.Client({
    contactPoints: ['cassandra1', 'cassandra2', 'cassandra3'],
    localDataCenter: 'datacenter1',
    keyspace: 'keyspace2',
    authProvider: new PlainTextAuthProvider('cassandra', 'cassandra'),
});

app.post('/create', async(req, res) => {
  
  console.log(req.body)
  res.send('hello world');
    //const query2 = `INSERT INTO pacientes (id,nombre,apellido,rut,email,fecha_nacimiento) VALUES (${id1},${req.body.nombre},${req.body.apellido},${req.body.rut},${req.body.email},${req.body.fecha_nacimiento});`;
    
    var id1 = uuidv4();
    var id2 = uuidv4();
    await client.execute(`SELECT * FROM pacientes WHERE rut='${req.body.rut}' ALLOW FILTERING`).then(response => {
        console.log(response.rows[0]);
        if (response.rows[0] != undefined) {
            console.log("existe el paciente")
            client2.execute(`INSERT INTO recetas (id, id_paciente, comentario, farmacos, doctor) VALUES(${id2}, ${id1}, '${req.body.comentario}', '${req.body.farmacos}', '${req.body.doctor}');`);
        } else {
            console.log("No existe el paciente")
            client.execute(`INSERT INTO pacientes(id,nombre,apellido,rut,email,fecha_nacimiento) VALUES (${id1},'${req.body.nombre}','${req.body.apellido}','${req.body.rut}','${req.body.email}','${req.body.fecha_nacimiento}');`);
            client2.execute(`INSERT INTO recetas(id, id_paciente, comentario, farmacos, doctor) VALUES(${id2}, ${id1}, '${req.body.comentario}', '${req.body.farmacos}', '${req.body.doctor}');`);
        }
    }).catch((err) => { console.log('ERROR:', err); });

 
})

app.post('/edit', async(req, res) => {
  console.log(req.body)
  client2.execute(`SELECT * FROM recetas WHERE id=${req.body.id} ALLOW FILTERING;`).then(response => {
      if (response.rows[0] != undefined) {
          client2.execute(`UPDATE recetas SET comentario = '${req.body.comentario}', farmacos = '${req.body.farmacos}', doctor = '${req.body.doctor}' WHERE id=${req.body.id};`);
          res.send("Receta editada");
      } else {
          res.send("Receta no encontrada");
      }
  }).catch(err => {
      console.log(err);
  });
})

app.post('/delete', async(req, res) => {
  console.log(req.body)
  client2.execute(`SELECT * FROM recetas WHERE id = ${req.body.id} ALLOW FILTERING;`).then(response => {
      if (response.rows[0] != undefined) {
          client2.execute(`DELETE FROM recetas WHERE id=${req.body.id};`);
          res.send("Receta eliminada");
      } else {
          res.send("No existe esa receta");
      }
  }).catch(err => {
      console.log(err);
  }
  );
})

app.listen(port, () => {
  console.log(`API RUN AT http://localhost:${port}`);
});

