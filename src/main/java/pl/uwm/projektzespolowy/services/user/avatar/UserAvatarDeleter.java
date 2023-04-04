package pl.uwm.projektzespolowy.services.user.avatar;

import com.google.common.io.Files;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.uwm.projektzespolowy.models.user.User;

import java.io.File;
import java.io.IOException;

@Service
@RequiredArgsConstructor
class UserAvatarDeleter {

    public void deleteOldUserAvatarIfExists(User user, MultipartFile newUserAvatar) {
        if (user.getAvatarPath() == null) {
            return;
        }
        if (filesHaveSameExtensions(user.getAvatarPath(), newUserAvatar.getOriginalFilename())) {
            // if files have the same extensions, old user avatar will be overwritten with new one,
            // so there is no need to delete it.
            return;
        }
        deleteAvatar(user);
    }

    public void deleteAvatar(User user) {
        var fullPath = new File("react" + user.getAvatarPath());
        try {
            java.nio.file.Files.deleteIfExists(fullPath.toPath());
        }
        catch (IOException ignored) {
            // not sure if program should stop here anytime, so I ignore that exception
        }
    }

    private boolean filesHaveSameExtensions(String firstPath, String secondPath) {
        return Files.getFileExtension(firstPath).equals(Files.getFileExtension(secondPath));
    }

}
