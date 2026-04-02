1. Primero instalamos las dependencias: nmp init -y,  npm i express cors dotenv,  npm install nodemon --save-dev

2. creamos estructura de archivos

3. Levantamos el servidor

4. creamos el Schema y las tablas en la bbdd usare MySQL Workbench

5. Instalar mongoose en el proyecto npm i mongoose

6. crear conexión con la base de datos

7. definir rutas

8. Traer las tablas de la base de datos

9. Instalar Multer y Cloudinary para guardar las img npm i multer Cloudinary.
crear la configuración a Cloudinary en config y crear su middleware.

10. Configurar controller para subir imagen. He instalar streamifier  npm i streamifier.

11. creamos la tabla temporadas para poder poner precios distintos y que sea automático con sus controladores y su ruta.

12. Hacer una ruta para unir el calendario con el de Booking crear la uri, instalar ical npm i node-ical. Esto lo hemos dejado preparado pero no va a funcionar porque no tenemos la ical de booking.


13. crear una cuenta en Resend para mandar el correo y conseguir la api. añadimos  la api en render.
y creamos la conexión como nos dice resend.


14. Instalamos swagger-ui-express swagger-jsdoc para hacer la documentación. creamos la carpeta docs donde ira swagger y en config swagger config. añadimos todas nuestras rutas get, post.

14. Ahora para terminar haremos los test con supertest para los endpoints http y node test para los demás. instalamos npm i -D jest supertest. creamos la carpeta test con el archivo casa.test.js y dentro los test.
instalamos npm i -D mongodb-memory-server porque sino fallan los test. 
Deberemos crear otro archivo de test para reservas.test.js porque Resend para testar sin enviar correos. Deberemos importar en el archivo: import { jest } from "@jest/globals";