CREATE TABLE
    roles (
        id SERIAL PRIMARY KEY,
        "roleName" character varying(255) NOT NULL UNIQUE,
        "createdAt" timestamp
        with
            time zone NOT NULL,
            "updatedAt" timestamp
        with
            time zone NOT NULL,
            "deletedAt" timestamp
        with
            time zone
    );

CREATE UNIQUE INDEX roles_pkey ON roles (id int4_ops);

CREATE UNIQUE INDEX "roles_roleName_key" ON roles ("roleName" text_ops);