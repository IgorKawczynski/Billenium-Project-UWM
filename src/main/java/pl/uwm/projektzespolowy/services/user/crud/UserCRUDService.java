package pl.uwm.projektzespolowy.services.user.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.user.UserResponseDTO;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserCRUDService {

    private final UserCreator userCreator;
    private final UserReader userReader;
    private final UserDeleter userDeleter;

    public User createUser(User user) {
        return userCreator.createUser(user);
    }

    public List<UserResponseDTO> getAllUsers() {
        return userReader.getAllUsersResponseDTO();
    }

    public User getUserById(Long id) {
        return userReader.getUserById(id);
    }

    public void deleteUser(Long id) {
        userDeleter.deleteUserById(id);
    }

}
