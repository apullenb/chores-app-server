CREATE TABLE parent_admin
(
 family_id        int NOT NULL GENERATED ALWAYS AS IDENTITY (
 start 5612368
 ),
 parent           text NOT NULL,
 children         text NOT NULL,
 name             text NOT NULL,
 user_type        text NOT NULL,
 parent_user_id   int NOT NULL GENERATED ALWAYS AS IDENTITY (
 start 5623
 ),
 family_last_name text NOT NULL,
 CONSTRAINT PK_user PRIMARY KEY ( family_id )
);




