create table if not exists public.checkbox (
    id BIGINT NOT NULL DEFAULT nextval('id_seq') PRIMARY KEY,
    title VARCHAR(45) NOT NULL,
    is_checked BOOLEAN NOT NULL,
    card_id BIGINT NOT NULL,
    CONSTRAINT fk_card FOREIGN KEY (card_id) REFERENCES cards(id)
);
