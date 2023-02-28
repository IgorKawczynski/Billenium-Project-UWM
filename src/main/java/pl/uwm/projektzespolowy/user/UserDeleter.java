package pl.uwm.projektzespolowy.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserDeleter {

    private final UserRepository userRepository;

    public void deleteUserById(Long id){
        userRepository.deleteById(id);
    }

}
