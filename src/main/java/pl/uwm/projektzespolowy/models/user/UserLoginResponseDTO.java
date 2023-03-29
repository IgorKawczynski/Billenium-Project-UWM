package pl.uwm.projektzespolowy.models.user;

import lombok.Builder;


public record UserLoginResponseDTO(String userId, String sessionId, String email, String firstName, String lastName) {

    @Builder public UserLoginResponseDTO {}

}
