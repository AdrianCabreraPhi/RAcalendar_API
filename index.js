const express = require('express')
const cors = require('cors')
const routes = require('./routes');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/birthday_api/', routes); // Monta las rutas en la aplicación

app.listen(PORT,()=> {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

