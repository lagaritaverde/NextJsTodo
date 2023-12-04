
CREATE TABLE IF NOT EXISTS public.users
(
    id uuid NOT NULL,
    name character varying(50) COLLATE pg_catalog."default",
    email character varying(100) COLLATE pg_catalog."default",
    password character varying(100) COLLATE pg_catalog."default",
    username character varying(50) COLLATE pg_catalog."default",
    surname character varying(50) COLLATE pg_catalog."default",
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to gamers;
	
CREATE TABLE IF NOT EXISTS public.todo
(
    id uuid NOT NULL,
    title character varying(50) COLLATE pg_catalog."default" NOT NULL,
    ownerId uuid NOT NULL,
    description character varying(100) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Todo_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.todo
    OWNER to gamers;
	
CREATE TABLE IF NOT EXISTS public.todoItem
(
    id uuid NOT NULL,
    title character varying COLLATE pg_catalog."default" NOT NULL,
    done boolean NOT NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.todoItem
    OWNER to gamers;