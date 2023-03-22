package pl.uwm.projektzespolowy.services.user.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
class UserDeleter {

    private final UserRepository userRepository;

    public void deleteUser(Long userId){
        userRepository.deleteById(userId);
    }

}
