package pl.uwm.projektzespolowy.services.user.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.user.UserCreateDTO;

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

        var userToCreate = new User(userCreateDTO.email(), passwordEncoder.encode(userCreateDTO.password()), userCreateDTO.firstName(), userCreateDTO.lastName());
        userRepository.save(userToCreate);
        return userToCreate;
    }

}
