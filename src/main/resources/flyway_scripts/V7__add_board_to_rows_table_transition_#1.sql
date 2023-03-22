alter table rows ADD board_id BIGINT;
alter table rows ADD CONSTRAINT fk_board FOREIGN KEY (board_id) REFERENCES boards(id)