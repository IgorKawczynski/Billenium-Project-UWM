package pl.uwm.projektzespolowy.services.user.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.user.UserLoginRequestDTO;

@Component
@RequiredArgsConstructor
class UserLogin {

    private final UserRepository userRepository;
    private final UserValidator userValidator;

    public User login(UserLoginRequestDTO userLoginRequestDTO) {

        userValidator.isNull("email", userLoginRequestDTO.email());
        userValidator.isNull("password", userLoginRequestDTO.password());
        userValidator.checkIfUserExists(userLoginRequestDTO.email());
        userValidator.checkIfCredentialsAreProper(userLoginRequestDTO.email(), userLoginRequestDTO.password());

        return userRepository.findRegisteredUserByEmail(userLoginRequestDTO.email());
    }

}
