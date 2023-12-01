CREATE TABLE IF NOT EXISTS public.users
(
    id uuid NOT NULL,
    name character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to gamers;
