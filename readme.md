## Práctica

Vamos a practicar [Basic Routing](https://expressjs.com/en/starter/basic-routing.html) con Node.js y Express.

## Primeros Pasos

### 1. Fork & Clone

- Haz clic en el botón **"Fork"** en la parte superior derecha de esta página de GitHub. Esto creará una copia del repositorio en tu cuenta de GitHub
- Clona tu fork en tu ordenador.

### 2. Configuración del Proyecto

1. Instalar dependencias: `npm install`
2. Crear un archivo `.env` basado en `.env.example` y configurar las variables de entorno
3. Iniciar el servidor: `npm start`
4. Verificar que el servidor está corriendo en `http://localhost:3000` (o el PORT configurado)
5. Usar [Postman](https://postman.com) para probar los endpoints

## Estructura de los Archivos

```bash
practice-express-basic-routing/
├── app.js              # Archivo principal del servidor Express
├── countries.json      # Base de datos JSON con información de países
├── package.json        # Dependencias y scripts del proyecto
├── .env.example        # Plantilla para variables de entorno
├── .env                # Tu archivo de configuración (crear manualmente)
└── node_modules/       # Dependencias instaladas (generado por npm)
```

**Descripción de archivos clave:**

- **app.js** - Aquí es donde crearás tus rutas. Este archivo ya tiene la configuración básica del servidor Express.
- **countries.json** - Contiene un array de 15 países europeos con sus datos (id, nombre, capital, código, bandera).
- **.env** - Archivo para almacenar variables de entorno como el puerto del servidor (debes crearlo basándote en `.env.example`).
- **package.json** - Define las dependencias del proyecto (Express, dotenv) y los scripts npm disponibles.

## Entendiendo las Rutas

La definición de rutas tiene la siguiente estructura:
```js
app.METHOD(PATH, HANDLER)
```

Un ejemplo de lo anterior es el método `GET` en la ruta raíz:

```js
app.get('/', (req, res) => {
  res.send('Hello World!')
})
```

## Tu Tarea

Actualmente, tenemos una aplicación en desarrollo donde las rutas están incompletas. Revisa la estructura de archivos y luego completa las siguientes iteraciones.

---

### Iteración 1: Obtener Todos los Países

Crea una ruta para obtener todos los países.

**Endpoint:** `GET /countries`

**Respuesta Esperada:**
- **Status:** `200 OK`
- **Body:**
```json
[
  { "id": 1, "name": "Spain", "capital": "Madrid", "code": "ES", "flag": "🇪🇸" },
  { "id": 2, "name": "France", "capital": "Paris", "code": "FR", "flag": "🇫🇷" },
  ...
]
```

---

### Iteración 2: Obtener un País por ID

Crea una ruta para obtener un único país por su ID.

**Endpoint:** `GET /countries/:id`

**Ejemplo:** `GET /countries/1`

**Respuesta Esperada:**
- **Status:** `200 OK`
- **Body:**
```json
{ "id": 1, "name": "Spain", "capital": "Madrid", "code": "ES", "flag": "🇪🇸" }
```

---

### Iteración 3: Actualizar un País por ID

Crea una ruta que permita actualizar un país por su ID. Puedes usar esto para actualizar cualquier campo (nombre, capital, código, etc.).

**Endpoint:** `PUT /countries/:id` o `PATCH /countries/:id`

**Ejemplo:** `PUT /countries/5`

**Body de la Petición:**
```json
{ "capital": "Lisbon" }
```

**Respuesta Esperada:**
- **Status:** `200 OK`
- **Body:** El objeto del país actualizado
```json
{ "id": 5, "name": "Portugal", "capital": "Lisbon", "code": "PT", "flag": "🇵🇹" }
```

---

### Iteración 4: Eliminar un País por ID

Crea una ruta para eliminar un país por su ID.

**Endpoint:** `DELETE /countries/:id`

**Ejemplo:** `DELETE /countries/5`

**Respuesta Esperada:**
- **Status:** `200 OK`
- **Body:**
```json
{ "message": "Country deleted successfully" }
```

---

### Iteración 5: Añadir un Nuevo País

Crea una ruta para añadir un nuevo país a la lista.

**Endpoint:** `POST /countries`

**Body de la Petición:**
```json
{ "id": 16, "name": "Norway", "capital": "Oslo", "code": "NO", "flag": "🇳🇴" }
```

**Respuesta Esperada:**
- **Status:** `201 Created`
- **Body:** El objeto del nuevo país creado
```json
{ "id": 16, "name": "Norway", "capital": "Oslo", "code": "NO", "flag": "🇳🇴" }
```

---

### Iteración 6: Manejo de Errores

Maneja los casos donde el ID del país no existe. Devuelve un código de Status `404` con un mensaje de error apropiado.

**Aplicar a:** Todas las rutas que usan `:id`

**Respuesta Esperada (cuando el país no se encuentra):**
- **Status:** `404 Not Found`
- **Body:**
```json
{ "error": "Country not found" }
```

---

## FAQ

<details>
<summary>1. ¿Qué es el archivo `.env` y por qué lo necesitamos?</summary>

<br>

El archivo `.env` almacena variables de entorno - valores de configuración que pueden cambiar dependiendo de dónde se ejecuta tu aplicación (desarrollo, producción, etc.).

**Beneficios:**
- **Flexibilidad:** Cambiar configuraciones sin modificar el código (ej. cambiar puertos fácilmente)
- **Seguridad:** Mantener datos sensibles (claves API, contraseñas) fuera del código
- **Buena Práctica:** Nunca hacer commit de `.env` a git (usar `.env.example` en su lugar)

**Cómo funciona:**
El paquete `dotenv` lee el archivo `.env` y hace las variables disponibles a través de `process.env.NOMBRE_VARIABLE`.

</details>

<details>
<summary>2. ¿Qué son `req.params` y `req.body`?</summary>

<br>

**`req.params`** - Captura valores de la ruta URL

```javascript
// Route: GET /countries/:id
// Request: GET /countries/5
app.get('/countries/:id', (req, res) => {
  console.log(req.params.id); // "5" (string)
});
```

**`req.body`** - Contiene datos enviados en el Body de la petición (POST/PUT/PATCH)

```javascript
// Route: POST /countries
// Request body: { "name": "Norway", "capital": "Oslo" }
app.post('/countries', (req, res) => {
  console.log(req.body.name); // "Norway"
  console.log(req.body.capital); // "Oslo"
});
```

**Diferencia clave:** `req.params` viene de la URL, `req.body` viene del payload de la petición.

</details>

<details>
<summary>3. ¿Qué códigos de Status HTTP debo usar?</summary>

<br>

- **200 OK** - Petición GET, PUT, PATCH o DELETE exitosa
- **201 Created** - Petición POST exitosa (recurso creado)
- **404 Not Found** - El recurso solicitado no existe
- **400 Bad Request** - Datos inválidos o faltantes en la petición (opcional para este ejercicio)

</details>

<details>
<summary>4. ¿Cómo puedo probar mis endpoints sin Postman?</summary>

<br>

**Opción 1: cURL (línea de comandos)**
```bash
curl http://localhost:3000/countries
curl http://localhost:3000/countries/1
curl -X POST http://localhost:3000/countries -H "Content-Type: application/json" -d '{"id":16,"name":"Norway","capital":"Oslo","code":"NO","flag":"🇳🇴"}'
```

**Opción 2: Extensión REST Client de VS Code**
Instala la extensión "REST Client" y crea un archivo `.http` con tus peticiones.

**Opción 3: Navegador (solo peticiones GET)**
Simplemente navega a `http://localhost:3000/countries` en tu navegador.

</details>

<details>
<summary>5. ¿Por qué no se está leyendo mi archivo `.env`?</summary>

<br>

**Problemas comunes:**

1. **Falta la configuración de `dotenv`** - Asegúrate de importar y configurar dotenv al inicio de `app.js`:
   ```javascript
   import 'dotenv/config';
   ```

2. **Nombre de archivo incorrecto** - Debe ser exactamente `.env` (no `.env.txt` o `env`)

3. **Ubicación incorrecta** - El archivo `.env` debe estar en el directorio raíz del proyecto (al mismo nivel que `app.js`)

4. **Reinicio requerido** - Reinicia el servidor después de crear o modificar `.env`

</details>

<details>
<summary>6. ¿Cómo encuentro un país por ID en el array?</summary>

<br>

Usa los métodos de arrays de JavaScript:

**Encontrar un país:**
```javascript
const country = countries.find(c => c.id === parseInt(req.params.id));
```

**Nota:** `req.params.id` es un string, así que conviértelo a número con `parseInt()` o usa `==` para comparación flexible.

**Encontrar el índice (para eliminar):**
```javascript
const index = countries.findIndex(c => c.id === parseInt(req.params.id));
if (index !== -1) {
  countries.splice(index, 1); // Remove 1 element at index
}
```

</details>
