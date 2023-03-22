create table if not exists public.rows (
            id BIGINT NOT NULL DEFAULT nextval('id_seq') PRIMARY KEY,
            title VARCHAR(45) NOT NULL,
            position INT NOT NULL
);

create table if not exists public.cells (
            id BIGINT NOT NULL DEFAULT nextval('id_seq') PRIMARY KEY,
            column_id BIGINT NOT NULL,
            row_id BIGINT NOT NULL,
            position INT NOT NULL,
            CONSTRAINT fk_column FOREIGN KEY (column_id) REFERENCES columns(id),
            CONSTRAINT fk_row FOREIGN KEY (row_id) REFERENCES rows(id)
);
