Server [localhost]:
Database [postgres]:
Port [5432]:
Username [postgres]:
Password for user postgres:

psql (17.4)
WARNING: Console code page (437) differs from Windows code page (1252)
         8-bit characters might not work correctly. See psql reference
         page "Notes for Windows users" for details.
Type "help" for help.

postgres=# CREATE DATABASE supply_chain;
CREATE DATABASE
postgres=# CREATE USER supply_admin WITH ENCRYPTED PASSWORD 'Sharmaji08@';
CREATE ROLE
postgres=# GRANT ALL PRIVILEGES ON DATABASE supply_chain TO supply_admin;
GRANT
postgres=# ALTER USER supply_admin CREATEDB;
ALTER ROLE
postgres=# \c supply_chain;
You are now connected to database "supply_chain" as user "postgres".
supply_chain=# CREATE TABLE items (
supply_chain(#     id SERIAL PRIMARY KEY,
supply_chain(#     name VARCHAR(255) NOT NULL,
supply_chain(#     origin VARCHAR(255) NOT NULL,
supply_chain(#     batch_number VARCHAR(50) UNIQUE NOT NULL,
supply_chain(#     current_stage VARCHAR(100) NOT NULL,
supply_chain(#     timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
supply_chain(# );
CREATE TABLE
supply_chain=#
supply_chain=# CREATE TABLE transactions (
supply_chain(#     id SERIAL PRIMARY KEY,
supply_chain(#     item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
supply_chain(#     actor VARCHAR(255) NOT NULL,
supply_chain(#     location VARCHAR(255) NOT NULL,
supply_chain(#     action VARCHAR(255) NOT NULL,
supply_chain(#     timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
supply_chain(# );
CREATE TABLE
supply_chain=# \l  -- List all databases
                                          List of databases
 Name | Owner | Encoding | Locale Provider | Collate | Ctype | Locale | ICU Rules | Access privileges
------+-------+----------+-----------------+---------+-------+--------+-----------+-------------------
(0 rows)


\l: extra argument "List" ignored
\l: extra argument "all" ignored
\l: extra argument "databases" ignored
supply_chain=# \dt  -- List tables in the current database
Did not find any relation named "--".
\dt: extra argument "List" ignored
\dt: extra argument "tables" ignored
\dt: extra argument "in" ignored
\dt: extra argument "the" ignored
\dt: extra argument "current" ignored
\dt: extra argument "database" ignored
supply_chain=# \l
                                                    List of databases
     Name     |  Owner   | Encoding | Locale Provider | Collate | Ctype | Locale | ICU Rules |     Access privileges

--------------+----------+----------+-----------------+---------+-------+--------+-----------+---------------------------
 postgres     | postgres | UTF8     | libc            | en      | en    |        |           |
 supply_chain | postgres | UTF8     | libc            | en      | en    |        |           | =Tc/postgres
+
              |          |          |                 |         |       |        |           | postgres=CTc/postgres    +
              |          |          |                 |         |       |        |           | supply_admin=CTc/postgres template0    | postgres | UTF8     | libc            | en      | en    |        |           | =c/postgres
+
              |          |          |                 |         |       |        |           | postgres=CTc/postgres
 template1    | postgres | UTF8     | libc            | en      | en    |        |           | =c/postgres
+
              |          |          |                 |         |       |        |           | postgres=CTc/postgres
(4 rows)


supply_chain=# \c supply_chain;
You are now connected to database "supply_chain" as user "postgres".
supply_chain=# \dt
            List of relations
 Schema |     Name     | Type  |  Owner
--------+--------------+-------+----------
 public | items        | table | postgres
 public | transactions | table | postgres
(2 rows)


supply_chain=# SELECT * FROM items;
 id | name | origin | batch_number | current_stage | timestamp
----+------+--------+--------------+---------------+-----------
(0 rows)


supply_chain=# \d items
                                          Table "public.items"
    Column     |            Type             | Collation | Nullable |              Default
---------------+-----------------------------+-----------+----------+-----------------------------------
 id            | integer                     |           | not null | nextval('items_id_seq'::regclass)
 name          | character varying(255)      |           | not null |
 origin        | character varying(255)      |           | not null |
 batch_number  | character varying(50)       |           | not null |
 current_stage | character varying(100)      |           | not null |
 timestamp     | timestamp without time zone |           |          | CURRENT_TIMESTAMP
Indexes:
    "items_pkey" PRIMARY KEY, btree (id)
    "items_batch_number_key" UNIQUE CONSTRAINT, btree (batch_number)
Referenced by:
    TABLE "transactions" CONSTRAINT "transactions_item_id_fkey" FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE


supply_chain=# SELECT * FROM items;
 id |  name  | origin | batch_number | current_stage |         timestamp
----+--------+--------+--------------+---------------+----------------------------
  3 | Coffee | Brazil | B123         | Processing    | 2025-03-18 09:24:30.294988
(1 row)