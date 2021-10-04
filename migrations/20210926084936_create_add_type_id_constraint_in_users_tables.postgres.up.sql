ALTER TABLE users
    ADD COLUMN type_id integer not null;
ALTER TABLE "users" ADD FOREIGN KEY ("type_id") REFERENCES types(id) ON DELETE CASCADE;
