CREATE TABLE
    "roleScopes" (
        "roleId" integer NOT NULL REFERENCES roles (id) ON DELETE CASCADE ON UPDATE CASCADE,
        "scopeId" integer NOT NULL REFERENCES scopes (id) ON DELETE CASCADE ON UPDATE CASCADE,
        "createdAt" timestamp
        with
            time zone NOT NULL,
            "updatedAt" timestamp
        with
            time zone NOT NULL,
            "deletedAt" timestamp
        with
            time zone,
            CONSTRAINT "roleScopes_pkey" PRIMARY KEY ("roleId", "scopeId")
    );

-- Indices -------------------------------------------------------
CREATE UNIQUE INDEX "roleScopes_pkey" ON "roleScopes" ("roleId" int4_ops, "scopeId" int4_ops);