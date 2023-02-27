package pl.uwm.projektzespolowy.column.dtos;

import lombok.Builder;
import pl.uwm.projektzespolowy.card.dtos.CardDTO;

import java.util.List;

public record ColumnDTO(String title, Integer cardsLimit, Integer position, List<CardDTO> cards) {

    @Builder public ColumnDTO {}
}
