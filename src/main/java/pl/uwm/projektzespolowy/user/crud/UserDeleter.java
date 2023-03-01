package pl.uwm.projektzespolowy.user.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.user.UserRepository;

@Component
@RequiredArgsConstructor
public class UserDeleter {

    private final UserRepository userRepository;

    public void deleteUserById(Long id){
        userRepository.deleteById(id);
    }

}
