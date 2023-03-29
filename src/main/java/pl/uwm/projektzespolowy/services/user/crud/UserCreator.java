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
        userValidator.isNull("firstName", userCreateDTO.firstName());
        userValidator.validateFieldLength("firstName", userCreateDTO.firstName(), 2, 45);
        userValidator.validateFieldRegex("firstName", userCreateDTO.firstName(), UserValidator.NAME_REGEX);
        userValidator.isNull("lastName", userCreateDTO.lastName());
        userValidator.validateFieldLength("lastName", userCreateDTO.lastName(), 2, 45);
        userValidator.validateFieldRegex("lastName", userCreateDTO.lastName(), UserValidator.NAME_REGEX);
        userValidator.isNull("email", userCreateDTO.email());
        userValidator.emailContainsAtSign(userCreateDTO.email());
        userValidator.validateFieldLength("email", userCreateDTO.email(), 5, 45);
        userValidator.validateFieldRegex("email", userCreateDTO.email(), UserValidator.EMAIL_REGEX);
        userValidator.isNull("password", userCreateDTO.password());
        userValidator.validateFieldLength("password", userCreateDTO.password(), 8, 45);
        userValidator.validateFieldRegex("password", userCreateDTO.password(), UserValidator.PASSWORD_REGEX);
        var userToCreate = new User(userCreateDTO.email(), passwordEncoder.encode(userCreateDTO.password()), userCreateDTO.firstName(), userCreateDTO.lastName());
        userRepository.save(userToCreate);
        return userToCreate;
    }

}
