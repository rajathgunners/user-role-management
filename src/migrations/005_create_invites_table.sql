CREATE TABLE
    invites (
        id SERIAL PRIMARY KEY,
        inviteeEmail character varying(255) NOT NULL UNIQUE,
        token character varying(255) NOT NULL,
        inviteeRoleId integer NOT NULL REFERENCES roles (id) ON DELETE CASCADE ON UPDATE CASCADE,
        inviterId integer NOT NULL REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE,
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
CREATE UNIQUE INDEX invites_pkey ON users (id int4_ops);

CREATE UNIQUE INDEX invites_token_key ON users (token int4_ops);