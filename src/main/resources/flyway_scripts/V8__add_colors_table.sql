
create table if not exists public.colors (
    id BIGINT NOT NULL DEFAULT nextval('id_seq') PRIMARY KEY,
    title VARCHAR(45) NOT NULL,
    value VARCHAR(25) NOT NULL,
    board_id BIGINT NOT NULL,
    CONSTRAINT fk_board FOREIGN KEY (board_id) REFERENCES boards(id)
);