-- Table: sectrax.st_group

-- DROP TABLE sectrax.st_group;

CREATE TABLE sectrax.st_group
(
  group_id numeric(10,0) NOT NULL,
  group_name varchar(255) NOT NULL,
  CONSTRAINT group_tab_pk PRIMARY KEY (role_id),
  CONSTRAINT group_tab_un UNIQUE (role_name)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE sectrax.st_group
  OWNER TO postgres;


-- Table: sectrax.st_role

-- DROP TABLE sectrax.st_role;

CREATE TABLE sectrax.st_role
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
ALTER TABLE sectrax.st_role
  OWNER TO postgres;


-- Table: sectrax.st_user

-- DROP TABLE sectrax.st_user;

CREATE TABLE sectrax.st_user
(
  user_id numeric(10,0) NOT NULL,
  user_name character varying(255) NOT NULL,
  user_passwd character varying(255) NOT NULL,
  user_mail_id character varying(255) NOT NULL,
  user_mob_no numeric(10,0) NOT NULL,
  user_otp_option character varying(255) NOT NULL,
  user_role_name varchar(255) NOT NULL,
  user_group_name varchar(255) NOT NULL,
  
  CONSTRAINT user_tab_pk PRIMARY KEY (user_id),
  CONSTRAINT user_tab_un UNIQUE (user_name),
  CONSTRAINT user_tab_fk FOREIGN KEY (user_role_name)
      REFERENCES sectrax.st_role (role_name) MATCH SIMPLE
      ON UPDATE RESTRICT ON DELETE CASCADE
  CONSTRAINT user_grp_fk FOREIGN KEY (user_group_name)
      REFERENCES sectrax.st_group (group_name) MATCH SIMPLE
      ON UPDATE RESTRICT ON DELETE CASCADE
)
WITH (
  OIDS=FALSE
);
ALTER TABLE sectrax.st_user
  OWNER TO postgres;
 

-- Table: sectrax.st_institute

-- DROP TABLE sectrax.st_institute;

CREATE TABLE sectrax.st_institute
(
  institute_id numeric(10,0) NOT NULL,
  institute_name varchar(255) NOT NULL,
  institute_data json,
  CONSTRAINT institute_tab_pk PRIMARY KEY (institute_id),
  CONSTRAINT institute_tab_un UNIQUE (institute_name)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE sectrax.st_institute
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

  