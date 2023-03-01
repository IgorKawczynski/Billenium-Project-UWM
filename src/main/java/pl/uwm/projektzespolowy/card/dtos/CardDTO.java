package pl.uwm.projektzespolowy.card.dtos;

import lombok.Builder;

public record CardDTO(Long id, String title, String description) {

    @Builder public CardDTO {}
}
