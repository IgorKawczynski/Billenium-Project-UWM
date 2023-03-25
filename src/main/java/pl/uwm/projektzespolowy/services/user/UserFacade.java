package pl.uwm.projektzespolowy.services.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.models.user.UserBoardsDTO;
import pl.uwm.projektzespolowy.models.user.UserResponseDTO;
import pl.uwm.projektzespolowy.services.user.crud.UserCRUDService;

import java.util.List;

@Component
@RequiredArgsConstructor
public class UserFacade {

    private final UserCRUDService userCRUDService;

    public UserResponseDTO getUserById(Long userId) {
        return userCRUDService.getUserById(userId).toDto();
    }

    public List<UserBoardsDTO> getAllUserBoards(Long userId) {
        return userCRUDService.getAllUserBoardsById(userId);
    }

    public void deleteUser(Long userId) {
        userCRUDService.deleteUser(userId);
    }
}
