# 📋 PRUEBA TÉCNICA #2: Sistema de Autenticación JWT

## ⭐⭐ Nivel: Intermedio | Tiempo estimado: 2 horas

---

## Descripción
Desarrollar un sistema de autenticación de usuarios utilizando JWT (JSON Web Tokens) con las siguientes funcionalidades.

---

## Requisitos Funcionales

### 1. Registro de Usuarios
**Endpoint:** `POST /api/auth/register`

**Debe recibir:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Debe cumplir:**
- El email debe ser único en la base de datos
- La contraseña debe almacenarse hasheada (usar bcrypt)
- Validar que los campos no estén vacíos
- Validar formato de email

**Debe retornar:**
- Usuario creado (sin mostrar la contraseña)
- Código 201 si es exitoso
- Código 400 si faltan datos o son inválidos
- Código 409 si el email ya existe

---

### 2. Inicio de Sesión
**Endpoint:** `POST /api/auth/login`

**Debe recibir:**
```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña123"
}
```

**Debe cumplir:**
- Verificar que el usuario exista
- Comparar la contraseña con el hash almacenado
- Generar un token JWT válido
- El token debe expirar en 24 horas
- El token debe contener el ID del usuario

**Debe retornar:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "usuario@ejemplo.com"
  }
}
```
- Código 200 si es exitoso
- Código 401 si las credenciales son incorrectas

---

### 3. Perfil de Usuario (Ruta Protegida)
**Endpoint:** `GET /api/auth/profile`

**Debe cumplir:**
- Requerir token JWT en el header: `Authorization: Bearer <token>`
- Validar que el token sea válido
- Extraer el ID del usuario del token
- Buscar los datos del usuario en la BD

**Debe retornar:**
```json
{
  "id": 1,
  "email": "usuario@ejemplo.com",
  "created_at": "2025-01-05T10:30:00"
}
```
- Código 200 si es exitoso
- Código 401 si no hay token o es inválido
- Código 404 si el usuario no existe

---

## Requisitos Técnicos

### Base de Datos
**Tabla `users` debe contener:**
- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `email` (VARCHAR, UNIQUE, NOT NULL)
- `password` (VARCHAR, NOT NULL) - almacenar hash
- `created_at` (DATETIME, DEFAULT CURRENT_TIMESTAMP)

### Tecnologías Requeridas
- **Express.js** para el servidor
- **bcrypt** para hashear contraseñas
- **jsonwebtoken** para generar y verificar tokens
- **PostgreSql** como base de datos
- **Zod** (opcional) para validaciones

### Estructura Mínima
```
/src
  server.js
  /routes
    auth.routes.js
  /middlewares
    auth.middleware.js (verificar JWT)
  /config
    db.js
```

---

## Criterios de Evaluación

### ✅ Funcionalidad (60%)
- [ ] Registro de usuarios funciona correctamente
- [ ] Login genera un token JWT válido
- [ ] Ruta protegida valida el token
- [ ] No se puede acceder a /profile sin token
- [ ] No se pueden registrar emails duplicados
- [ ] Las contraseñas se almacenan hasheadas

### ✅ Validaciones (20%)
- [ ] Validación de campos requeridos
- [ ] Validación de formato de email
- [ ] Validación de longitud mínima de password (6 caracteres)

### ✅ Seguridad (10%)
- [ ] Contraseñas hasheadas con bcrypt
- [ ] Token JWT firmado correctamente
- [ ] No se exponen contraseñas en las respuestas

### ✅ Códigos HTTP (10%)
- [ ] 201 para registro exitoso
- [ ] 200 para login y profile exitosos
- [ ] 400 para datos inválidos
- [ ] 401 para credenciales incorrectas o sin token
- [ ] 409 para email duplicado

---

## Casos de Prueba para Validar

### Test 1: Registro exitoso
```bash
POST /api/auth/register
Body: { "email": "test@test.com", "password": "123456" }
Resultado esperado: 201, usuario creado
```

### Test 2: Registro con email duplicado
```bash
POST /api/auth/register (segunda vez con mismo email)
Resultado esperado: 409, error de email duplicado
```

### Test 3: Login exitoso
```bash
POST /api/auth/login
Body: { "email": "test@test.com", "password": "123456" }
Resultado esperado: 200, retorna token
```

### Test 4: Login con credenciales incorrectas
```bash
POST /api/auth/login
Body: { "email": "test@test.com", "password": "wrongpass" }
Resultado esperado: 401, credenciales inválidas
```

### Test 5: Acceso a perfil sin token
```bash
GET /api/auth/profile
(sin header Authorization)
Resultado esperado: 401, no autorizado
```

### Test 6: Acceso a perfil con token válido
```bash
GET /api/auth/profile
Headers: Authorization: Bearer <token_valido>
Resultado esperado: 200, datos del usuario
```

---

## Entregables

1. Código fuente en GitHub
2. Archivo `.env.example` con las variables necesarias
3. Script SQL para crear la tabla `users`
4. README.md con instrucciones de instalación y uso

---

## Tiempo Límite: 2 horas

**Proyecto completado cuando los 6 casos de prueba funcionen correctamente.**