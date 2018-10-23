SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';

CREATE FUNCTION public.trigger_change_count_child_after_del() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    DECLARE
        tmp node%ROWTYPE;
    BEGIN
      SELECT * INTO tmp FROM node WHERE id = OLD.node_id;
    
      tmp.count_child = tmp.count_child - 1;
      
      UPDATE node
      SET count_child = tmp.count_child
      WHERE id = OLD.node_id; 
    
      return OLD;
    END;
    $$;


ALTER FUNCTION public.trigger_change_count_child_after_del() OWNER TO postgres;

CREATE FUNCTION public.trigger_change_count_child_after_ins() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    DECLARE
        tmp node%ROWTYPE;
    BEGIN
      SELECT * INTO tmp FROM node WHERE id = NEW.node_id;
    
      tmp.count_child = tmp.count_child + 1;
      
      UPDATE node
      SET count_child = tmp.count_child
      WHERE id = NEW.node_id; 
      
      return NEW;
    END;
    $$;


ALTER FUNCTION public.trigger_change_count_child_after_ins() OWNER TO postgres;

SET default_tablespace = '';

SET default_with_oids = false;

CREATE TABLE public.node (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    count_child integer DEFAULT 0 NOT NULL,
    ip_adress character varying(255),
    web_port integer,
    node_id integer,
    type_id integer NOT NULL
);

ALTER TABLE public.node OWNER TO postgres;

CREATE SEQUENCE public.node_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.node_id_seq OWNER TO postgres;

ALTER SEQUENCE public.node_id_seq OWNED BY public.node.id;

CREATE TABLE public.node_type (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    is_endpoint boolean NOT NULL
);

ALTER TABLE public.node_type OWNER TO postgres;

CREATE SEQUENCE public.node_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.node_type_id_seq OWNER TO postgres;

ALTER SEQUENCE public.node_type_id_seq OWNED BY public.node_type.id;

ALTER TABLE ONLY public.node ALTER COLUMN id SET DEFAULT nextval('public.node_id_seq'::regclass);

ALTER TABLE ONLY public.node_type ALTER COLUMN id SET DEFAULT nextval('public.node_type_id_seq'::regclass);

COPY public.node (id, name, count_child, ip_adress, web_port, node_id, type_id) FROM stdin;
2	node js server 1	0	\N	\N	\N	4
3	node js server 2	0	\N	\N	\N	4
4	storage node 1	0	\N	\N	1	2
5	storage node 2	0	\N	\N	1	2
6	render node 1	0	\N	\N	1	3
1	control node	3	\N	\N	\N	1
\.

COPY public.node_type (id, name, is_endpoint) FROM stdin;
1	control node	f
2	storage node	t
3	render node	t
4	node js	t
5	pacs	t
6	nginx	f
\.

SELECT pg_catalog.setval('public.node_id_seq', 6, true);

SELECT pg_catalog.setval('public.node_type_id_seq', 6, true);

ALTER TABLE ONLY public.node
    ADD CONSTRAINT node_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.node_type
    ADD CONSTRAINT node_type_pkey PRIMARY KEY (id);

CREATE TRIGGER change_count_child_after_del AFTER DELETE ON public.node FOR EACH ROW EXECUTE PROCEDURE public.trigger_change_count_child_after_del();

CREATE TRIGGER change_count_child_after_ins AFTER INSERT ON public.node FOR EACH ROW EXECUTE PROCEDURE public.trigger_change_count_child_after_ins();

ALTER TABLE ONLY public.node
    ADD CONSTRAINT node_node_id_fkey FOREIGN KEY (node_id) REFERENCES public.node(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY public.node
    ADD CONSTRAINT node_type_id_fkey FOREIGN KEY (type_id) REFERENCES public.node_type(id) ON UPDATE CASCADE ON DELETE CASCADE;
