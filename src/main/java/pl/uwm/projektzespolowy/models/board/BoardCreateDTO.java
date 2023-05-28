package pl.uwm.projektzespolowy.models.board;

import lombok.Builder;

public record BoardCreateDTO(String userId, String title) {

    @Builder public BoardCreateDTO {}

}
