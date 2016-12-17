-- Table: sectrax.role

-- DROP TABLE sectrax.role;

CREATE TABLE sectrax.role
(
  role_id numeric(10,0) NOT NULL,
  role_name varchar(255) NOT NULL,
  role_data json,
  CONSTRAINT role_tab_pk PRIMARY KEY (role_id),
  CONSTRAINT role_tab_un UNIQUE (role_name)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE sectrax.role
  OWNER TO postgres;
  
  

-- Table: sectrax.user

-- DROP TABLE sectrax.user;

CREATE TABLE sectrax.user
(
  user_id numeric(10,0) NOT NULL,
  user_name character varying(255) NOT NULL,
  mail_id character varying(255) NOT NULL,
  passwd character varying(255),
  role_name varchar(255) NOT NULL,
  CONSTRAINT user_tab_pk PRIMARY KEY (user_id),
  CONSTRAINT user_tab_un UNIQUE (user_name),
  CONSTRAINT user_tab_fk FOREIGN KEY (role_name)
      REFERENCES sectrax.role (role_name) MATCH SIMPLE
      ON UPDATE RESTRICT ON DELETE CASCADE
)
WITH (
  OIDS=FALSE
);
ALTER TABLE sectrax.user
  OWNER TO postgres;



 
-- Table: sectrax.resource

-- DROP TABLE sectrax.resource;

CREATE TABLE sectrax.resource
(
  resource_id numeric(10,0) NOT NULL,
  resource_name varchar(255) NOT NULL,
  resource_href varchar(255) NOT NULL,
  parent_name varchar(255) NOT NULL,
  role_name varchar(255) NOT NULL,
  CONSTRAINT resource_tab_pk PRIMARY KEY (resource_id),
  CONSTRAINT resource_tab_un UNIQUE (resource_name),
  CONSTRAINT resource_tab_fk FOREIGN KEY (role_name)
      REFERENCES sectrax.role (role_name) MATCH SIMPLE
      ON UPDATE RESTRICT ON DELETE CASCADE
)
WITH (
  OIDS=FALSE
);
ALTER TABLE sectrax.resource
  OWNER TO postgres;

  