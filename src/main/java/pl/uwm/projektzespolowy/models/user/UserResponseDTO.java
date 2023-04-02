package pl.uwm.projektzespolowy.models.user;

import lombok.Builder;

public record UserResponseDTO(String id,
                              String firstName,
                              String lastName,
                              String avatarPath) {

    @Builder
    public UserResponseDTO {}

}
