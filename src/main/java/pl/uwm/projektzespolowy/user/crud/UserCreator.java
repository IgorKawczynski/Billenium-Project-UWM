package pl.uwm.projektzespolowy.user.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.user.UserRepository;

@Component
@RequiredArgsConstructor
public class UserCreator {

    // It will be replaced with spring security based registration
    private final UserRepository userRepository;
    public User createUser(User user) {
        return userRepository.save(user);
    }

}
