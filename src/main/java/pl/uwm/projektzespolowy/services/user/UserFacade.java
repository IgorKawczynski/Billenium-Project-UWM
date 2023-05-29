package pl.uwm.projektzespolowy.services.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import pl.uwm.projektzespolowy.models.user.*;
import pl.uwm.projektzespolowy.security.SessionRegistry;
import pl.uwm.projektzespolowy.services.user.avatar.UserAvatarService;
import pl.uwm.projektzespolowy.services.user.crud.UserCRUDService;
import pl.uwm.projektzespolowy.services.user.crud.UserLoginService;

import java.util.List;

@Component
@RequiredArgsConstructor
public class UserFacade {

    private final UserCRUDService userCRUDService;
    private final UserLoginService userLoginService;
    private final UserAvatarService userAvatarService;
    private final AuthenticationManager authenticationManager;
    private final SessionRegistry sessionRegistry;

    public User createUser(UserCreateDTO userCreateDTO) {
        return userCRUDService.createUser(userCreateDTO);
    }

    public UserLoginResponseDTO login(UserLoginRequestDTO userLoginRequestDTO) {

        var userToLoginInTo = userLoginService.login(userLoginRequestDTO);

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userLoginRequestDTO.email(), userLoginRequestDTO.password()));
        final String sessionId = sessionRegistry.registerSession(userLoginRequestDTO.email());

        return UserLoginResponseDTO.builder()
                .userId(String.valueOf(userToLoginInTo.getId()))
                .sessionId(sessionId)
                .email(userToLoginInTo.getEmail())
                .firstName(userToLoginInTo.getFirstName())
                .lastName(userToLoginInTo.getLastName()).build();
    }

    public void changePassword(UserChangePasswordDTO userChangePasswordDTO) {
        userCRUDService.changePassword(userChangePasswordDTO);
    }

    public User getUserById(Long userId) {
        return userCRUDService.getUserById(userId);
    }

    public UserResponseDTO getUserByEmail(String email) {
        return userCRUDService.getUserByEmail(email).toDto();
    }

    public List<UserBoardsDTO> getAllUserBoards(Long userId) {
        return userCRUDService.getAllUserBoardsById(userId);
    }

    public UserResponseDTO changeUserAvatar(Long userId, MultipartFile avatarImage) {
        var user = userCRUDService.getUserById(userId);
        userAvatarService.changeUserAvatar(user, avatarImage);
        userCRUDService.saveChangedUser(user);
        return user.toDto();
    }

    public void deleteUserAvatar(Long userId) {
        var user = userCRUDService.getUserById(userId);
        userAvatarService.deleteUserAvatar(user);
        userCRUDService.saveChangedUser(user);
    }

    public void deleteUser(Long userId) {
        userCRUDService.deleteUser(userId);
    }

}
