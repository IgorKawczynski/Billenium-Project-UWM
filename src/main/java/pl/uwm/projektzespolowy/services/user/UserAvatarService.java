package pl.uwm.projektzespolowy.services.user;

import com.google.common.io.Files;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.uwm.projektzespolowy.models.user.User;

@Service
@RequiredArgsConstructor
class UserAvatarService {

    public static final String IMAGES_STORED_PATH = "react/src/assets/imgs/user_avatars/";
    public static final String IMAGES_PREFIX_IN_DATABASE = "/src/assets/imgs/user_avatars/";

    private final UserAvatarSaver userAvatarSaver;

    public void changeUserAvatar(User user, MultipartFile avatarImage) {
        userAvatarSaver.save(user.getId(), avatarImage);
        user.setAvatarPath(createFullAvatarPath(user.getId(), Files.getFileExtension(avatarImage.getOriginalFilename())));
    }

    private String createFullAvatarPath(Long userId, String imageExtension) {
        return IMAGES_PREFIX_IN_DATABASE + userId + '.' + imageExtension;
    }

}
