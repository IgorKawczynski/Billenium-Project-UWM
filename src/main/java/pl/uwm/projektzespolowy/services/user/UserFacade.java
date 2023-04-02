package pl.uwm.projektzespolowy.services.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import pl.uwm.projektzespolowy.models.user.*;
import pl.uwm.projektzespolowy.security.SessionRegistry;
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

    public UserResponseDTO createUser(UserCreateDTO userCreateDTO) {
        return userCRUDService.createUser(userCreateDTO).toDto();
    }

    public UserLoginResponseDTO login(UserLoginRequestDTO userLoginRequestDTO) {

        var userToLoginInto = userLoginService.login(userLoginRequestDTO);

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userLoginRequestDTO.email(), userLoginRequestDTO.password()));
        final String sessionId = sessionRegistry.registerSession(userLoginRequestDTO.email());

        return UserLoginResponseDTO.builder()
                .userId(String.valueOf(userToLoginInto.getId()))
                .sessionId(sessionId)
                .email(userToLoginInto.getEmail())
                .firstName(userToLoginInto.getFirstName())
                .lastName(userToLoginInto.getLastName()).build();
    }

    public UserResponseDTO getUserById(Long userId) {
        return userCRUDService.getUserById(userId).toDto();
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

    public void deleteUser(Long userId) {
        userCRUDService.deleteUser(userId);
    }

}
