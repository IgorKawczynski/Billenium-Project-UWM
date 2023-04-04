package pl.uwm.projektzespolowy.services.user.avatar;

import com.google.common.io.Files;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.uwm.projektzespolowy.models.user.User;

@Service
@RequiredArgsConstructor
public class UserAvatarService {

    public static final String IMAGES_STORED_PATH = "react/src/assets/imgs/user_avatars/";
    public static final String IMAGES_PREFIX_IN_DATABASE = "/src/assets/imgs/user_avatars/";
    private final UserAvatarValidator userAvatarValidator;

    private final UserAvatarSaver userAvatarSaver;
    private final UserAvatarDeleter userAvatarDeleter;

    public void changeUserAvatar(User user, MultipartFile avatarImage) {
        userAvatarValidator.validate(avatarImage);
        userAvatarSaver.saveAvatar(user.getId(), avatarImage);
        userAvatarDeleter.deleteOldUserAvatarIfExists(user, avatarImage);
        var avatarPath = createFullAvatarPath(user.getId(), Files.getFileExtension(avatarImage.getOriginalFilename()));
        user.setAvatarPath(avatarPath);
    }

    private String createFullAvatarPath(Long userId, String imageExtension) {
        return IMAGES_PREFIX_IN_DATABASE + userId + '.' + imageExtension;
    }

    public void deleteUserAvatar(User user) {
        userAvatarDeleter.deleteAvatar(user);
        user.setAvatarPath(null);
    }

}
