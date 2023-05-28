package pl.uwm.projektzespolowy.services.user.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.uwm.projektzespolowy.models.user.User;
import pl.uwm.projektzespolowy.models.user.UserBoardsDTO;
import pl.uwm.projektzespolowy.models.user.UserChangePasswordDTO;
import pl.uwm.projektzespolowy.models.user.UserCreateDTO;

import java.util.List;


@Service
@RequiredArgsConstructor
public class UserCRUDService {

    private final UserCreator userCreator;
    private final UserReader userReader;
    private final UserUpdater userUpdater;
    private final UserDeleter userDeleter;

    public User createUser(UserCreateDTO userCreateDTO) {
        return userCreator.createUser(userCreateDTO);
    }

    public void changePassword(UserChangePasswordDTO userChangePasswordDTO) {
        var userId = Long.parseLong(userChangePasswordDTO.userId());
        var user = userReader.getUserById(userId);
        userUpdater.changePassword(user, userChangePasswordDTO.oldPassword(), userChangePasswordDTO.newPassword());
    }

    public User getUserById(Long userId) {
        return userReader.getUserById(userId);
    }

    public List<UserBoardsDTO> getAllUserBoardsById(Long userId) {
        return userReader.getAllUserBoardsById(userId);
    }

    public User getUserByEmail(String email) {
        return userReader.getUserByEmail(email);
    }

    public void saveChangedUser(User user) {
        userUpdater.saveChangedUser(user);
    }

    public void deleteUser(Long userId) {
        userDeleter.deleteUser(userId);
    }

}
