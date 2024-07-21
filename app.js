const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const path = require('path')

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));



// READ y WRITE FILE ///////////////////////////////

const readData = function() {
    const data = fs.readFileSync("./abrigos.json");
    return JSON.parse(data);
}

const writeData = function(data) {
    fs.writeFileSync("./abrigos.json", JSON.stringify(data));
}

const readDataUser = function() {
    const data = fs.readFileSync("./usuarios.json");
    return JSON.parse(data);
}

const writeDataUser = function(data) {
    fs.writeFileSync("./usuarios.json", JSON.stringify(data));
}



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

app.get("/abrigos", (req, res) => {
    const data = readData();
    res.json(data.abrigos);
});

app.get("/abrigos/:id", (req, res) => {
    const data = readData();
    const id = req.params.id;
    const abrigo = data.abrigos.find((abrigo) => {
        return abrigo.id === id;
    });

    res.json(abrigo);
});

app.post("/abrigos", (req, res) => {
    const data = readData();
    const body = req.body;
    const newabrigo = {
        ...body,
    };
    data.abrigos.push(newabrigo);
    writeData(data);
    res.json(newabrigo);
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