package pl.uwm.projektzespolowy.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserCreator {

    // It will be replaced with spring security based registration
    private final UserRepository userRepository;
    public User createUser(User user) {
        return userRepository.save(user);
    }

}
