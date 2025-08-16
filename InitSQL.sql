-- Creates the 'usuarios' table
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(60) NOT NULL UNIQUE,  -- 'NOT NULL' and 'UNIQUE' are crucial
    password VARCHAR(255) NOT NULL
);

-- Creates the 'cumpleaños' table
CREATE TABLE cumpleaños (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(45) NOT NULL,
    apellido VARCHAR(45),
    fecha DATE NOT NULL,
    notificar TINYINT(1) DEFAULT 1,     -- Represents a boolean (true/false)
    notas VARCHAR(200),
    usuario_id INT NOT NULL,
    
    -- This defines the relationship and ensures data integrity
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);