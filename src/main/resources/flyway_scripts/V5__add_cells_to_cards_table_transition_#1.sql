alter table cards add cell_id BIGINT;
alter table cards add constraint fk_cell FOREIGN KEY (cell_id) REFERENCES cells(id);
