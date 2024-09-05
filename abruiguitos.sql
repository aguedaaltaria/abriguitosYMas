-- CREATE DATABASE abriguitos;

USE abriguitos;

-- CREATE TABLE marcas (
--     ID_marca INT AUTO_INCREMENT PRIMARY KEY,
--     nombre_marca VARCHAR(100) NOT NULL
-- );

-- CREATE TABLE tipos (
--     ID_tipo INT AUTO_INCREMENT PRIMARY KEY,
--     nombre_tipo VARCHAR(100) NOT NULL
-- );

-- CREATE TABLE abriguitos (
--     ID INT AUTO_INCREMENT PRIMARY KEY,
--     nombre VARCHAR(150) NOT NULL,
--     ID_marca INT,
--     ID_tipo INT,
--     FOREIGN KEY (ID_marca) REFERENCES marcas(ID_marca),
--     FOREIGN KEY (ID_tipo) REFERENCES tipos(ID_tipo)
-- );

-- CREATE TABLE usuarios (
--     ID INT AUTO_INCREMENT PRIMARY KEY,
--     nombre VARCHAR(50) NOT NULL,
--     apellido VARCHAR(50),
--     correo VARCHAR(100) NOT NULL UNIQUE,
--     telefono VARCHAR(25),
--     contrasenia VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE especificaciones_abriguito (
--     ID_abriguito INT NOT NULL,
--     color VARCHAR(20) NOT NULL,
--     tamanio ENUM('xxs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl') NOT NULL,
--     precio_bruto float NOT NULL,
--     stock int,
--     imagen blob,
--     PRIMARY KEY (ID_abriguito, color, tamanio),
--     FOREIGN KEY (ID_abriguito) REFERENCES abriguitos(ID)
-- );

-- CREATE TABLE direccion (
--     ID INT PRIMARY KEY,
--     ID_usuario INT,
--     calle VARCHAR(30),
--     nombre_entrega VARCHAR(25),
--     estado VARCHAR(50),
--     ciudad VARCHAR(50),
--     pais VARCHAR(50),
--     zipcode INT,
--     FOREIGN KEY (ID_usuario) REFERENCES usuarios(ID)
-- );

-- CREATE TABLE historial_pedidos (
--     ID INT AUTO_INCREMENT PRIMARY KEY,
--     fecha_facturacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     ID_abriguito INT,
--     ID_usuario INT,
--     ID_direccion INT,
--     cantidad INT,
--     color VARCHAR(20) NOT NULL,
--     tamanio ENUM('xxs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl') NOT NULL,
--     precio_unidad float NOT NULL,
--     precio_envio float,
--     precio_taxes float,
--     precio_total float NOT NULL,
--     estado_envio ENUM('pendiente', 'enviado', 'entregado') DEFAULT 'pendiente',
--     fecha_entrega DATE,
--     FOREIGN KEY (ID_abriguito) REFERENCES abriguitos(ID),
--     FOREIGN KEY (ID_usuario) REFERENCES usuarios(ID),
--     FOREIGN KEY (ID_direccion) REFERENCES direccion(ID)
-- );

-- CREATE TABLE favoritos (
--     ID INT AUTO_INCREMENT PRIMARY KEY,
--     ID_usuario INT NOT NULL,
--     ID_abriguito INT NOT NULL,
--     color VARCHAR(20) NOT NULL,
--     tamanio ENUM('xxs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl', '4xl') NOT NULL,
--     FOREIGN KEY (ID_abriguito) REFERENCES abriguitos(ID),
--     FOREIGN KEY (ID_usuario) REFERENCES usuarios(ID)
-- );

-- //

-- INSERT INTO usuarios (
--     ID,
--     nombre,
--     apellido,
--     correo,
--     telefono,
--     contrasenia
-- ) VALUES (
--     '9858', 
--     'Mariana', 
--     'Gomez',  
--     'marianagomez@email.com',
--     '(000) - 000 - 0000',
--     'batata123'
-- );

-- INSERT INTO usuarios (
--     ID,
--     nombre,
--     apellido,
--     correo,
--     telefono,
--     contrasenia
-- ) VALUES (
--     '7817', 
--     'Pedro', 
--     'Rodriguez',  
--     'pedro.r@email.com',
--     '(000) - 000 - 0001',
--     'batata123'
-- );

-- INSERT INTO usuarios (
--     ID,
--     nombre,
--     apellido,
--     correo,
--     telefono,
--     contrasenia
-- ) VALUES (
--     '5630', 
--     'Sofia', 
--     'Martinez',  
--     'sofim57@email.com',
--     '(000) - 000 - 0002',
--     'batata123'
-- );

-- INSERT INTO usuarios (
--     ID,
--     nombre,
--     apellido,
--     correo,
--     telefono,
--     contrasenia
-- ) VALUES (
--     '0512', 
--     'Juan', 
--     'Perez',  
--     'jp@gmail.com',
--     '(000) - 000 - 0003',
--     'batata123'
-- );

-- INSERT INTO usuarios (
--     ID,
--     nombre,
--     apellido,
--     correo,
--     telefono,
--     contrasenia
-- ) VALUES (
--     '7566', 
--     'Mateo', 
--     'Peralta',  
--     'mppp@gmail.com',
--     '(000) - 000 - 0004',
--     'batata123'
-- );

SELECT * FROM usuarios;

