## Practice

We will practice [Basic Routing](https://expressjs.com/en/starter/basic-routing.html) with Node.js and Express.

## Setup

1. Install dependencies: `npm install`
2. Create a `.env` file based on `.env.example` and configure your environment variables
3. Start the server: `npm start`
4. Verify the server is running at `http://localhost:3000` (or your configured PORT)
5. Use [Postman](https://postman.com) to test the endpoints

## Understanding Routes

Route definition takes the following structure:
```js
app.METHOD(PATH, HANDLER)
```

An example of the above is the `GET` method on a root path:

```js
app.get('/', (req, res) => {
  res.send('Hello World!')
})
```

## Your Task

Currently, we have a work-in-progress app where the routes are incomplete. Review the file structure, then complete the following iterations.

---

### Iteration 1: Get All Countries

Create a route to retrieve all countries.

**Endpoint:** `GET /countries`

**Expected Response:**
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

### Iteration 2: Get a Country by ID

Create a route to retrieve a single country by its ID.

**Endpoint:** `GET /countries/:id`

**Example:** `GET /countries/1`

**Expected Response:**
- **Status:** `200 OK`
- **Body:**
```json
{ "id": 1, "name": "Spain", "capital": "Madrid", "code": "ES", "flag": "🇪🇸" }
```

---

### Iteration 3: Update a Country by ID

Create a route that allows updating a country by its ID. You can use this to update any field (name, capital, code, etc.).

**Endpoint:** `PUT /countries/:id` or `PATCH /countries/:id`

**Example:** `PUT /countries/5`

**Request Body:**
```json
{ "capital": "Lisbon" }
```

**Expected Response:**
- **Status:** `200 OK`
- **Body:** The updated country object
```json
{ "id": 5, "name": "Portugal", "capital": "Lisbon", "code": "PT", "flag": "🇵🇹" }
```

---

### Iteration 4: Delete a Country by ID

Create a route to delete a country by its ID.

**Endpoint:** `DELETE /countries/:id`

**Example:** `DELETE /countries/5`

**Expected Response:**
- **Status:** `200 OK`
- **Body:**
```json
{ "message": "Country deleted successfully" }
```

---

### Iteration 5: Add a New Country

Create a route to add a new country to the list.

**Endpoint:** `POST /countries`

**Request Body:**
```json
{ "id": 16, "name": "Norway", "capital": "Oslo", "code": "NO", "flag": "🇳🇴" }
```

**Expected Response:**
- **Status:** `201 Created`
- **Body:** The newly created country object
```json
{ "id": 16, "name": "Norway", "capital": "Oslo", "code": "NO", "flag": "🇳🇴" }
```

---

### Iteration 6: Handle Errors

Handle cases where a country ID doesn't exist. Return a `404` status code with an appropriate error message.

**Apply to:** All routes that use `:id`

**Expected Response (when country not found):**
- **Status:** `404 Not Found`
- **Body:**
```json
{ "error": "Country not found" }
```

---

## FAQ

<details>
<summary>1. What is the `.env` file and why do we need it?</summary>

<br>

The `.env` file stores environment variables - configuration values that can change depending on where your app runs (development, production, etc.).

**Benefits:**
- **Flexibility:** Change settings without modifying code (e.g., switch ports easily)
- **Security:** Keep sensitive data (API keys, passwords) out of your code
- **Best Practice:** Never commit `.env` to git (use `.env.example` instead)

**How it works:**
The `dotenv` package reads the `.env` file and makes variables available via `process.env.VARIABLE_NAME`.

</details>

<details>
<summary>2. What are `req.params` and `req.body`?</summary>

<br>

**`req.params`** - Captures values from the URL path

```javascript
// Route: GET /countries/:id
// Request: GET /countries/5
app.get('/countries/:id', (req, res) => {
  console.log(req.params.id); // "5" (string)
});
```

**`req.body`** - Contains data sent in the request body (POST/PUT/PATCH)

```javascript
// Route: POST /countries
// Request body: { "name": "Norway", "capital": "Oslo" }
app.post('/countries', (req, res) => {
  console.log(req.body.name); // "Norway"
  console.log(req.body.capital); // "Oslo"
});
```

**Key difference:** `req.params` comes from URL, `req.body` comes from request payload.

</details>

<details>
<summary>3. What HTTP status codes should I use?</summary>

<br>

- **200 OK** - Successful GET, PUT, PATCH, or DELETE request
- **201 Created** - Successful POST request (resource created)
- **404 Not Found** - Requested resource doesn't exist
- **400 Bad Request** - Invalid or missing data in request (optional for this exercise)

</details>

<details>
<summary>4. How do I test my endpoints without Postman?</summary>

<br>

**Option 1: cURL (command line)**
```bash
curl http://localhost:3000/countries
curl http://localhost:3000/countries/1
curl -X POST http://localhost:3000/countries -H "Content-Type: application/json" -d '{"id":16,"name":"Norway","capital":"Oslo","code":"NO","flag":"🇳🇴"}'
```

**Option 2: VS Code REST Client extension**
Install the "REST Client" extension and create a `.http` file with your requests.

**Option 3: Browser (GET requests only)**
Simply navigate to `http://localhost:3000/countries` in your browser.

</details>

<details>
<summary>5. Why isn't my `.env` file being read?</summary>

<br>

**Common issues:**

1. **Missing `dotenv` configuration** - Make sure to import and configure dotenv at the top of `app.js`:
   ```javascript
   import 'dotenv/config';
   ```

2. **Wrong file name** - Must be exactly `.env` (not `.env.txt` or `env`)

3. **Wrong location** - The `.env` file should be in the project root directory (same level as `app.js`)

4. **Restart required** - Restart your server after creating or modifying `.env`

</details>

<details>
<summary>6. How do I find a country by ID in the array?</summary>

<br>

Use JavaScript's array methods:

**Find a country:**
```javascript
const country = countries.find(c => c.id === parseInt(req.params.id));
```

**Note:** `req.params.id` is a string, so convert it to a number with `parseInt()` or use `==` for loose comparison.

**Find the index (for deleting):**
```javascript
const index = countries.findIndex(c => c.id === parseInt(req.params.id));
if (index !== -1) {
  countries.splice(index, 1); // Remove 1 element at index
}
```

</details>