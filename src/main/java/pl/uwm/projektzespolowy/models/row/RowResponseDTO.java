package pl.uwm.projektzespolowy.models.row;

import lombok.Builder;

public record RowResponseDTO(String id,
                             String title,
                             Integer position) {

    @Builder
    public RowResponseDTO {}
}
