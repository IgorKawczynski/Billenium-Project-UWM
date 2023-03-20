package pl.uwm.projektzespolowy.models.cell;

import lombok.Builder;

public record CellResponseDTO(String id,
                              Integer position) {

    @Builder
    public CellResponseDTO {}

}
