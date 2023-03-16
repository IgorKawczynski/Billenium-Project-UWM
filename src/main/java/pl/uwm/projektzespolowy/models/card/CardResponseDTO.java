package pl.uwm.projektzespolowy.models.card;

import lombok.Builder;

public record CardResponseDTO(String id,
                              String title,
                              String description,
                              Integer position) {

    @Builder public CardResponseDTO {}

}
