package pl.uwm.projektzespolowy.models.color;

import lombok.Builder;

public record ColorResponseDTO(String id, String title, String value) {

    @Builder public ColorResponseDTO {}

}
