CREATE TABLE
    scopes (
        id SERIAL PRIMARY KEY,
        "scopeName" character varying(255) NOT NULL UNIQUE,
        "scopeService" character varying(255) NOT NULL,
        "scopeAction" character varying(255) NOT NULL,
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

CREATE UNIQUE INDEX scopes_pkey1 ON scopes (id int4_ops);

CREATE UNIQUE INDEX "scopes_scopeName_key1" ON scopes ("scopeName" text_ops);