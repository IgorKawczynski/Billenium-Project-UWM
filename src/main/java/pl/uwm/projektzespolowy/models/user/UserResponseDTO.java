package pl.uwm.projektzespolowy.models.user;

import lombok.Builder;

public record UserResponseDTO(String id,
                              String email,
                              String firstName,
                              String lastName,
                              String avatarPath,
                              String avatarColor) {

    @Builder
    public UserResponseDTO {}

}
