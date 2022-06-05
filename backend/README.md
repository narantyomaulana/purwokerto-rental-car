# Challenge 6 Car Management API

Ini Adalah Repository Car Managenet API yang mengimplementasikan fitur Authentication dan Authorization.

# Getting Started

Tahap Pertama install semua node_modules dengan.

```sh
npm install
```
Setelah itu buat file `.env` yang isinya sama dengan [`.env-example`] dan isi sesuai dengan milik anda.

```sh
DB_USERNAME=postgres
DB_PASSWORD=123
DB_NAME=challenges6
DB_HOST=127.0.0.1
PORT=8080
SUPERADMIN_PASSWORD=password
JWT_PRIVATE_KEY=ibunegara123
```
Lalu setelah itu run program dengan `start` yang berada di package.json seperti.

```sh
npm run start
```
## Database Management

- `sequelize db:create` gunakan db:create untuk membuat database.
- `sequelize db:drop` gunakan db:drop untuk menghapus database.
- `sequelize db:migrate` gunakan db:migrate untuk migrasi database.
- `sequelize db:seed:all` gunakan db:seed:all untuk mengisi data ke dalam database.
- `sequelize db:migrate:undo` gunakan db:migrate:undo untuk membatalkan migrasi sebelumnya

# Superadmin Data
Didalam folder seeders terdapat file yang berisi data superadmin email dan password untuk login sebagai superAdmin seperti dibawah ini.

```json
  {
    "email": "admin@gmail.com",
    "password": "password"
  }
```
