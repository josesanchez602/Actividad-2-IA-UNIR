# README - Ejecución del entorno de pruebas

## Requisitos previos

Antes de ejecutar las pruebas es necesario disponer de las siguientes herramientas instaladas:

* Java JDK 17 o 21
* Node.js (versión 18 o superior)
* Maven (o Maven Wrapper `mvnw`)
* npm


## Backend

### Instalación de dependencias

Desde la carpeta `backend` ejecutar:

```bash
./mvnw clean install
```

### Ejecución de las pruebas

Para ejecutar todas las pruebas unitarias y de integración:

```bash
./mvnw test
```

Las pruebas utilizan:

* JUnit 5
* Mockito
* Spring Boot Test
* MockMvc
* Base de datos H2 en memoria

## Frontend

### Instalación de dependencias

Desde la carpeta `frontend` ejecutar:

```bash
npm install
```

### Ejecución de las pruebas

Para ejecutar todas las pruebas del frontend:

```bash
npm test
```

Las pruebas se han desarrollado utilizando:

* Jest
* React Testing Library

## Casos de prueba implementados

### Backend

#### BookService

* Obtener todos los libros.
* Obtener un libro por identificador.
* Validación de libro inexistente.

#### OrderService

* Crear pedido correctamente.
* Validar existencia de libros.
* Validar stock disponible.
* Actualizar el stock tras una compra.
* Crear pedidos con varios ejemplares del mismo libro.
* Gestión de errores por libro inexistente y stock insuficiente.

#### Integración

* GET `/books`
* POST `/orders`
* Respuestas HTTP correctas para cada caso.

### Frontend

#### BookCard

* Renderizado del título.
* Renderizado del precio.
* Añadir libro al carrito.

#### Cart

* Cálculo del importe total.
* Eliminación de libros.
* Actualización de cantidades.

#### Checkout

* Envío de petición POST.
* Mensaje de compra realizada correctamente.
* Mensaje de stock insuficiente.
* Mensaje de error interno.

---

## Resultado esperado

Si todas las pruebas se ejecutan correctamente, tanto Maven como Jest mostrarán que todos los casos de prueba han sido superados sin errores.
