package pl.uwm.projektzespolowy.services.user.avatar;

import com.google.common.io.Files;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import pl.uwm.projektzespolowy.exceptions.fileexceptions.CreatingFileException;

import java.io.File;
import java.io.IOException;

import static pl.uwm.projektzespolowy.services.user.avatar.UserAvatarService.IMAGES_STORED_PATH;

@Component
@RequiredArgsConstructor
class UserAvatarSaver {

    public void saveAvatar(Long userId, MultipartFile file) {
        try {
            var fileExtension = Files.getFileExtension(file.getOriginalFilename());
            var image = new File(IMAGES_STORED_PATH + userId + "." + fileExtension);
            image.createNewFile();
            file.transferTo(image.getAbsoluteFile());
        }
        catch (IOException exception) {
            // IOException is thrown here if the 'image' object path is invalid,
            // so if it occurs, we must repair path.
            // Might also occur if the directory from IMAGES_STORED_PATH doesn't exist
            throw new CreatingFileException("Error while adding an avatar.");
        }
    }

}
