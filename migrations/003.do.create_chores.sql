CREATE TABLE chores
(
 chore_id    int NOT NULL GENERATED ALWAYS AS IDENTITY (
 start 653
 ),
 chore_name  text NOT NULL,
 value       int NOT NULL,
 steps        NOT NULL,
 photo        NOT NULL,
 family_id   int NOT NULL,
 description text NOT NULL,
 time        int NOT NULL,
 complete    boolean NOT NULL DEFAULT false,
 child_id    int NOT NULL,
 CONSTRAINT PK_chores PRIMARY KEY ( chore_id ),
 CONSTRAINT FK_49 FOREIGN KEY ( family_id ) REFERENCES parent_admin ( family_id ),
 CONSTRAINT FK_67 FOREIGN KEY ( child_id ) REFERENCES children ( child_id )
);

CREATE INDEX fkIdx_50 ON chores
(
 family_id
);

CREATE INDEX fkIdx_68 ON chores
(
 child_id
);




