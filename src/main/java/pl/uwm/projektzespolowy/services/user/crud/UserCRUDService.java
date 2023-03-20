package pl.uwm.projektzespolowy.services.user.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.uwm.projektzespolowy.models.user.User;

@Service
@RequiredArgsConstructor
public class UserCRUDService {

    private final UserCreator userCreator;
    private final UserReader userReader;
    private final UserUpdater userUpdater;
    private final UserDeleter userDeleter;

    public User getUserById(Long id) {
        return userReader.getUserById(id);
    }

    public void deleteUser(Long userId) {
        userDeleter.deleteUser(userId);
    }

}
