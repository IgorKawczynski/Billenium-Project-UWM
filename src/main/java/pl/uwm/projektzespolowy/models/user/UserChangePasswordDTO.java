package pl.uwm.projektzespolowy.models.user;

public record UserChangePasswordDTO(String userId, String oldPassword, String newPassword) {
}
