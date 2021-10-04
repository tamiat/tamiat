CREATE TABLE "types"
(
    id           SERIAL PRIMARY KEY,
    "name"       varchar(70) UNIQUE NOT NULL,
    "created_at" timestamp          NOT NULL DEFAULT (now()),
    "deleted_at" timestamp          NOT NULL DEFAULT (now()),
    "updated_at" timestamp          NOT NULL DEFAULT (now())
);
