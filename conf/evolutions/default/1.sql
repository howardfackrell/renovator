# --- !Ups

CREATE TABLE conversion (
  id                  BIGSERIAL PRIMARY KEY,
  stp                 CHARACTER(10),
  original_program_id INT,
  program_id          INT
);

CREATE INDEX orig_pgm_idx
  ON conversion (stp, original_program_id);
CREATE INDEX stp_idx
  ON conversion (stp);

CREATE TABLE conversion_step (
  id     BIGSERIAL PRIMARY KEY,
  seq_Id INT,
  name   CHARACTER VARYING(50)
);

CREATE INDEX cstep_name_idx
  ON conversion_step (name);

CREATE TABLE step (
  id                 BIGSERIAL PRIMARY KEY,
  conversion_id      BIGINT,
  conversion_step_id BIGINT,
  status             CHARACTER VARYING(30),
  error              TEXT
);

CREATE INDEX step_idx
  ON step (conversion_id, conversion_step_id);

ALTER TABLE step
  ADD CONSTRAINT conversion_fk
FOREIGN KEY (conversion_id)
REFERENCES conversion (id)
ON DELETE CASCADE;

ALTER TABLE step
  ADD CONSTRAINT conv_step_fk
FOREIGN KEY (conversion_step_id)
REFERENCES conversion_step (id)
ON DELETE CASCADE;

INSERT INTO conversion_step (seq_id, name) VALUES (1, 'Copy Program');
INSERT INTO conversion_step (seq_id, name) VALUES (2, 'Copy Assets to Documentum');
INSERT INTO conversion_step (seq_id, name) VALUES (3, 'Copy Clui Admins');
INSERT INTO conversion_step (seq_id, name) VALUES (4, 'Create Default Blocks');


# --- !Downs

DROP INDEX orig_pgm_idx;
DROP INDEX stp_idx;
DROP INDEX step_idx;
DROP INDEX cstep_name_idx;
DROP TABLE step;
DROP TABLE conversion_step;
DROP TABLE conversion;