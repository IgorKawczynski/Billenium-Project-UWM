package pl.uwm.projektzespolowy.user.dtos;

import lombok.Builder;

public record UserResponseDTO(Long id, String firstName, String lastName) {

    @Builder
    public UserResponseDTO {}
}
