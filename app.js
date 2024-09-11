const express = require('express');
const app = express();
const path = require('path');
const pool = require('./db');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Contactos a los diferentes htmls /////////////////////

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'abrigo-1.html'));
    // res.send("Bienvenido Usuario");
})

app.get('/carrito', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'carrito.html'));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'login.html'));
})

app.get('/perfil', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'perfil.html'));
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'register.html'));
})

app.get('/miCuenta', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'miCuenta.html'));
})



// Metodos para abrigos.json

app.get("/abriguitos", (req, res) => {
    pool.query('SELECT abriguitos.ID, abriguitos.nombre AS nombre_abrigo, marcas.nombre_marca, tipos.nombre_tipo, especificaciones_abriguito.color, especificaciones_abriguito.tamanio, especificaciones_abriguito.precio_bruto, especificaciones_abriguito.imagen FROM abriguitos JOIN marcas ON abriguitos.ID_marca = marcas.ID_marca JOIN tipos ON abriguitos.ID_tipo = tipos.ID_tipo JOIN especificaciones_abriguito ON abriguitos.ID = especificaciones_abriguito.ID_abriguito;', (err, results) => {
        if (err) throw err;
        res.json(results)
    })
});

app.get("/abriguitos/:id", (req, res) => {
    const id = req.params.id;
    pool.query('SELECT abriguitos.ID, abriguitos.nombre AS nombre_abrigo, marcas.nombre_marca, tipos.nombre_tipo, especificaciones_abriguito.color, especificaciones_abriguito.tamanio, especificaciones_abriguito.precio_bruto, especificaciones_abriguito.imagen FROM abriguitos JOIN marcas ON abriguitos.ID_marca = marcas.ID_marca JOIN tipos ON abriguitos.ID_tipo = tipos.ID_tipo JOIN especificaciones_abriguito ON abriguitos.ID = especificaciones_abriguito.ID_abriguito WHERE abriguitos.ID = ? ORDER BY abriguitos.ID; ;', [id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post("/abriguitos", (req, res) => {
    const { ID_marca,
        nombre_marca,
        ID_tipo,
        nombre_tipo,
        ID,
        nombre,
        color,
        tamanio,
        precio,
        stock,
        imagen } = req.body;
    pool.query(`INSERT INTO marcas (
        ID_marca, 
        nombre_marca
    ) VALUES (
        '${ID_marca}', 
        '${nombre_marca}' 
    );
    INSERT INTO tipos (
        ID_tipo,
        nombre_tipo
    ) VALUES (
        '${ID_tipo}', 
        '${nombre_tipo}'
    );
    INSERT INTO abriguitos (
        ID,
        nombre,
        ID_marca,
        ID_tipo
    ) VALUES (
        '${ID}', 
        '${nombre}',
        '${ID_marca}',
        '${ID_tipo}'
    );
    INSERT INTO especificaciones_abriguito (
        ID_abriguito,
        color,
        tamanio,
        precio_bruto,
        stock,
        imagen
    ) VALUES (
        '${ID}', 
        '${color}',
        '${tamanio}',
        '${precio}',
        '${stock}',
        '${imagen}'
    );`, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
});

app.put("/abrigos/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = req.params.id;
    const abrigoIndex = data.abrigos.findIndex((abrigo) => {
        return abrigo.id === id;
    });

    data.abrigos[abrigoIndex] = {
        id: id,
        ...body,
    };
    
    writeData(data);
    res.json({ mensaje: "Modificado" });    
});

app.patch("/abrigos/:id", (req, res) => {
    const data = readData(); // Reutilizar datos existentes
    const id = req.params.id;
    const updateData = req.body;

    const updatedData = updateData(data.abrigos, id, updateData);

    writeData(updatedData);
    res.json({ mensaje: "Modificado parcialmente" });
});

app.delete("/abrigos/:id", (req, res) => {
    const data = readData();
    const id = req.params.id;
    const abrigoIndex = data.abrigos.findIndex((abrigo) => {
        return abrigo.id === id;
    });
    
    data.abrigos.splice(abrigoIndex, 1);
    writeData(data);
    res.json({ mensaje: "Borrado" });
});




// Metodos para usuarios.json

app.get("/usuarios", (req, res) => {
    const data = readDataUser();
    res.json(data.usuarios);
});

app.get("/usuarios/:id", (req, res) => {
    const data = readDataUser();
    const id = req.params.id;
    const usuario = data.usuarios.find((usuario) => {
        return usuario.id === id;
    });

    res.json(usuario);
});

app.post("/usuarios", (req, res) => {
    const data = readDataUser();
    const body = req.body;
    const newusuario = {
        ...body,
    };
    data.usuarios.push(newusuario);
    writeDataUser(data);
    res.json(newusuario);
});

app.put("/usuarios/:id", (req, res) => {
    const data = readDataUser();
    const body = req.body;
    const id = req.params.id;
    const usuarioIndex = data.usuarios.findIndex((usuario) => {
        return usuario.id === id;
    });

    data.usuarios[usuarioIndex] = {
        id: id,
        ...body,
    };
    
    writeDataUser(data);
    res.json({ mensaje: "Modificado" });    
});

app.patch("/usuarios/:id", (req, res) => {
    const data = readDataUser(); // Reutilizar datos existentes
    const id = req.params.id;
    const updateData = req.body;

    const updatedData = updateData(data.usuarios, id, updateData);

    writeDataUser(updatedData);
    res.json({ mensaje: "Modificado parcialmente" });
});

app.delete("/usuarios/:id", (req, res) => {
    const data = readDataUser();
    const id = req.params.id;
    const usuarioIndex = data.usuarios.findIndex((usuario) => {
        return usuario.id === id;
    });
    
    data.usuarios.splice(usuarioIndex, 1);
    writeDataUser(data);
    res.json({ mensaje: "Borrado" });
});




// Puerto //////////////////////////////////

const PORT = process.env.PORT ?? 3300;

app.listen(PORT, () => {
    console.log(`server listening on por http://localhost:${PORT}`);
});