package pl.uwm.projektzespolowy.services.user.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.user.User;

@Component
@RequiredArgsConstructor
class UserUpdater {

    private final UserRepository userRepository;
    private final UserValidator userValidator;
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void saveChangedUser(User user) {
        userRepository.saveAndFlush(user);
    }

    public void changePassword(User user, String oldPassword, String newPassword) {
        userValidator.isNull("oldPassword", oldPassword);
        userValidator.checkIfCredentialsAreProper(user.getEmail(), oldPassword);

        userValidator.isNull("newPassword", newPassword);
        userValidator.validateFieldLength("newPassword", newPassword, 8, 45);
        userValidator.validateFieldRegex("newPassword", newPassword, UserValidator.PASSWORD_REGEX);

        var password = passwordEncoder.encode(newPassword);
        user.setPassword(password);

        userRepository.saveAndFlush(user);
    }

}
