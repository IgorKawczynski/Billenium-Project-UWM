create sequence if not exists public.id_seq as bigint start with 1000;

create table if not exists public.users (
    id BIGINT NOT NULL DEFAULT nextval('id_seq') PRIMARY KEY,
    email VARCHAR(45) NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL
    );

create table if not exists public.boards (
    id BIGINT NOT NULL DEFAULT nextval('id_seq') PRIMARY KEY,
    title VARCHAR(45) NOT NULL,
    creator_id BIGINT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (creator_id) REFERENCES users(id)
    );

create table if not exists public.columns (
    id BIGINT NOT NULL DEFAULT nextval('id_seq') PRIMARY KEY,
    title VARCHAR(45) NOT NULL,
    "limit" INT NOT NULL,
    position INT NOT NULL,
    board_id BIGINT NOT NULL,
    CONSTRAINT fk_board FOREIGN KEY (board_id) REFERENCES boards(id)
    );

create table if not exists public.cards (
    id BIGINT NOT NULL DEFAULT nextval('id_seq') PRIMARY KEY,
    title VARCHAR(45) NOT NULL,
    description TEXT,
    column_id BIGINT NOT NULL,
    CONSTRAINT fk_column FOREIGN KEY (column_id) REFERENCES columns(id)
    );

create table public.users_boards (
    user_id BIGINT NOT NULL,
    board_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, board_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_board FOREIGN KEY (board_id) references boards(id)
);

create table public.users_cards (
    user_id BIGINT NOT NULL,
    card_id BIGINT NOT NULL,
    PRIMARY KEY (user_id, card_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_card FOREIGN KEY (card_id) REFERENCES cards(id)
);