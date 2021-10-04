CREATE TABLE users(
                         id SERIAL PRIMARY KEY,
                         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                         updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                         email TEXT NOT NULL UNIQUE ,
                         password TEXT NOT NULL
)