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

    public User getUserById(Long userId) {
        return userReader.getUserById(userId);
    }

    public User getUserByEmail(String email) {
        return userReader.getUserByEmail(email);
    }

    public void deleteUser(Long userId) {
        userDeleter.deleteUser(userId);
    }

}
