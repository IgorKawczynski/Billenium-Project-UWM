package pl.uwm.projektzespolowy.models.column;

import lombok.Builder;
import pl.uwm.projektzespolowy.models.card.CardResponseDTO;

import java.util.List;

public record ColumnResponseDTO(Long id, String title, Integer cardsLimit, Integer position, List<CardResponseDTO> cards) {

    @Builder public ColumnResponseDTO {}
}
