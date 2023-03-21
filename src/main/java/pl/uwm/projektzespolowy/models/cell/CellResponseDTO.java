package pl.uwm.projektzespolowy.models.cell;

import lombok.Builder;
import pl.uwm.projektzespolowy.models.card.CardResponseDTO;

import java.util.List;

public record CellResponseDTO(String id,
                              Integer position,
                              List<CardResponseDTO> cards) {

    @Builder
    public CellResponseDTO {}

}
