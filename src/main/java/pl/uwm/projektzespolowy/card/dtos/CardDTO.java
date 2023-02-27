package pl.uwm.projektzespolowy.card.dtos;

import lombok.Builder;

public record CardDTO(String title, String description) {

    @Builder public CardDTO {}
}
