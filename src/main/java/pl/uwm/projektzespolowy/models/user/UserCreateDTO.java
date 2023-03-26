package pl.uwm.projektzespolowy.models.user;

import lombok.Builder;

public record UserCreateDTO(String email,
                            String firstName,
                            String lastName,
                            String password) {

    @Builder
    public UserCreateDTO {}
}
