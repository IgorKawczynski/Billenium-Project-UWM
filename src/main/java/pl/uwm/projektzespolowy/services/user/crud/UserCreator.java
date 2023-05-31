package pl.uwm.projektzespolowy.services.user.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.user.AvatarColor;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.user.UserCreateDTO;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

@Component
@RequiredArgsConstructor
class UserCreator {

    private final UserRepository userRepository;
    private final UserValidator userValidator;
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User createUser(UserCreateDTO userCreateDTO) {
        userValidator.checkIfUserAlreadyExists(userCreateDTO.email());

        userValidator.isNull("First name", userCreateDTO.firstName());
        userValidator.validateFieldLength("First name", userCreateDTO.firstName(), 2, 45);
        userValidator.validateFieldRegex("First name", userCreateDTO.firstName(), UserValidator.NAME_REGEX);

        userValidator.isNull("Last name", userCreateDTO.lastName());
        userValidator.validateFieldLength("Last name", userCreateDTO.lastName(), 2, 45);
        userValidator.validateFieldRegex("Last name", userCreateDTO.lastName(), UserValidator.NAME_REGEX);

        userValidator.isNull("Email", userCreateDTO.email());
        userValidator.emailContainsAtSign(userCreateDTO.email());
        userValidator.validateFieldLength("Email", userCreateDTO.email(), 5, 45);
        userValidator.validateFieldRegex("Email", userCreateDTO.email(), UserValidator.EMAIL_REGEX);

        userValidator.isNull("Password", userCreateDTO.password());
        userValidator.validateFieldLength("Password", userCreateDTO.password(), 8, 45);
        userValidator.validateFieldRegex("Password", userCreateDTO.password(), UserValidator.PASSWORD_REGEX);

        var avatarColor = generateAvatarColor(userCreateDTO.firstName(), userCreateDTO.lastName());
        var userToCreate = new User(
                userCreateDTO.email(),
                passwordEncoder.encode(userCreateDTO.password()),
                userCreateDTO.firstName(),
                userCreateDTO.lastName(),
                avatarColor
        );

        userRepository.save(userToCreate);
        return userToCreate;
    }

    private static AvatarColor generateAvatarColor(String firstName, String lastName) {
        String fullName = firstName + lastName;
        String hash = null;
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(fullName.getBytes());
            byte[] bytes = md.digest();
            StringBuilder sb = new StringBuilder();
            for (byte b : bytes) {
                sb.append(Integer.toHexString((b & 0xff) + 0x100).substring(1));
            }
            hash = sb.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        assert hash != null;
        int index = new SecureRandom(hash.getBytes()).nextInt(AvatarColor.values().length);
        return AvatarColor.getColorValue(AvatarColor.values()[index].getValue());
    }

}
