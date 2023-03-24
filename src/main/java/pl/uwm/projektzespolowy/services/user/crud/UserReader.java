package pl.uwm.projektzespolowy.services.user.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.exceptions.EntityNotFoundException;
import pl.uwm.projektzespolowy.models.user.User;

@Component
@RequiredArgsConstructor
class UserReader {

    private final UserRepository userRepository;

    public User getUserById(Long userId) {
        return userRepository
                .findById(userId)
                .orElseThrow( () -> new EntityNotFoundException("user", "User with id: " + userId + " does not exist!"));
    }

    public User getUserByEmail(String email) {
        return userRepository
                .findUserByEmail(email)
                .orElseThrow( () -> new EntityNotFoundException("user", "User with email: " + email + " does not exist!"));
    }

}
