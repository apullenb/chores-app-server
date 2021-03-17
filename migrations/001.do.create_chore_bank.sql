CREATE TABLE chore_options
(
 chore_opt_id  int NOT NULL GENERATED ALWAYS AS IDENTITY (
 start 43146
 ),
 title         text NOT NULL,
 value         int NOT NULL,
 steps         text NOT NULL,
 description   text NOT NULL,
 time_est      int NOT NULL,
 suggested_age int NOT NULL,
 CONSTRAINT PK_chore_options PRIMARY KEY ( chore_opt_id )
);


