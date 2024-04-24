const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mysql = require('mysql2');
const PORT = 5000;
const bodyParser = require('body-parser');
const app = express();
//const server = require("http").createServer(app);
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'HERdie3%',
    database: 'EasyCode'
  });
  app.use(cors());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  //SESIONES
  app.use(session({
    secret: 'HERDMYRPVF', // Clave secreta para firmar la cookie de sesión
    resave: false, // No vuelvas a guardar la sesión si no hay cambios
    saveUninitialized: false // No guarde sesiones no inicializadas
}));

app.get("/datos", (req, res) => {
  // OBTENCION DE DATOS DB
  connection.query('SELECT comments.id, comments.texto, comments.fecha, users.nombre AS usuario FROM comments INNER JOIN users ON comments.id = users.id', (error, results) => {
    if (error) {
      console.error('Error al obtener los comentarios de la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    console.log(results)
    res.json(results);
  });
});

app.get("/intermedio", (req, res) => {
  // OBTENCION DE DATOS DB
  connection.query('SELECT inter.id, inter.texto, inter.fecha, users.nombre AS usuario FROM inter INNER JOIN users ON inter.id = users.id', (error, results) => {
    if (error) {
      console.error('Error al obtener los comentarios de la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    console.log(results)
    res.json(results);
  });
});

app.get("/avanzado", (req, res) => {
  // OBTENCION DE DATOS DB
  connection.query('SELECT avanzado.id, avanzado.texto, avanzado.fecha, users.nombre AS usuario FROM avanzado INNER JOIN users ON avanzado.id = users.id', (error, results) => {
    if (error) {
      console.error('Error al obtener los comentarios de la base de datos:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
      return;
    }
    console.log(results)
    res.json(results);
  });
});

  // Ruta para el registro de cuentas
  app.post("/registrar", (req, res) => {
    const { nombre, email, password, nivel } = req.body;
    //OBTENCION DE DATOS DB
    connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
      if (error) {
        console.error('Error al verificar el correo electrónico:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }
  
      if (results.length > 0) {
        // El correo electrónico ya está registrado
        res.status(400).json({ error: 'El correo electrónico ya está registrado' });
        return;
      }
  
      //INSERCION DE DATOS CREAR CUENTA
      connection.query('INSERT INTO users (nombre,email,password,nivel) VALUES (?,?,?,?)', [nombre,email,password,nivel], (error, results) => {
      if (error){
        console.error('Error al registrar usuario:',error);
        res.status(500).json({error: 'Error interno del servidor'});
        return;
      }
      res.json ({ message: 'Usuario registrado exitosamente' });
      });
    });
  });
  
  // Ruta para el inicio de sesion
  app.post("/login", (req, res) => {
    const { email, password } = req.body;
  
    connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {
      if (error) {
        console.error('Error al buscar usuario en la base de datos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
        return;
      }
      if (results.length === 0) {
        // No se encontró el usuario con el correo electrónico dado
        res.status(401).json({ error: 'Correo electrónico o contraseña incorrectos' });
        return;
      }
      const user = results[0];
      if (password !== user.password) {
        // Contraseña incorrecta
        res.status(401).json({ error: 'Correo electrónico o contraseña incorrectos' });
        return;
      }
      // Inicio de sesión exitoso
      req.session.user = {
        id: user.id,
        username: user.nombre,
        email: email,
        nivel: user.nivel
      };
      console.log(req.session.user)
      res.json ({ message: 'Login exitoso',user: req.session.user});
    });
  });  

    // Ruta para el registro de comentarios
  app.post("/datos", (req, res) => {
    const { id, texto } = req.body;
    //OBTENCION DE DATOS DB
      connection.query('INSERT INTO comments (id,texto) VALUES (?,?)', [id,texto], (error, results) => {
      if (error){
        console.error('Error al registrar comentario:',error);
        res.status(500).json({error: 'Error interno del servidor'});
        return;
      }
      res.json ({ message: 'Comentario basico registrado exitosamente' });
      });
    });

  app.post("/intermedio", (req, res) => {
    const { id, texto } = req.body;
    //OBTENCION DE DATOS DB
      connection.query('INSERT INTO inter (id,texto) VALUES (?,?)', [id,texto], (error, results) => {
      if (error){
        console.error('Error al registrar comentario:',error);
        res.status(500).json({error: 'Error interno del servidor'});
        return;
      }
      res.json ({ message: 'Comentario intermedio registrado exitosamente' });
      });
    });

  app.post("/avanzado", (req, res) => {
    const { id, texto } = req.body;
    //OBTENCION DE DATOS DB
      connection.query('INSERT INTO avanzado (id,texto) VALUES (?,?)', [id,texto], (error, results) => {
      if (error){
        console.error('Error al registrar comentario:',error);
        res.status(500).json({error: 'Error interno del servidor'});
        return;
      }
      res.json ({ message: 'Comentario avanzado registrado exitosamente' });
      });
    });

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});
