CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        email character varying(255) NOT NULL UNIQUE,
        password character varying(255) NOT NULL,
        "roleId" integer NOT NULL REFERENCES roles (id) ON DELETE SET NULL ON UPDATE CASCADE,
        "createdAt" timestamp
        with
            time zone NOT NULL,
            "updatedAt" timestamp
        with
            time zone NOT NULL,
            "deletedAt" timestamp
        with
            time zone,
    );

-- Indices -------------------------------------------------------
CREATE UNIQUE INDEX users_pkey ON users (id int4_ops);

CREATE UNIQUE INDEX users_email_key ON users (email text_ops);