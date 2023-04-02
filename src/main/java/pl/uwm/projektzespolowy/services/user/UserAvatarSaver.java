package pl.uwm.projektzespolowy.services.user;

import com.google.common.io.Files;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

import static pl.uwm.projektzespolowy.services.user.UserAvatarService.IMAGES_STORED_PATH;

@Component
@RequiredArgsConstructor
class UserAvatarSaver {

    public void save(Long userId, MultipartFile file) {
        if (file == null || file.getOriginalFilename() == null) {
            throw new IllegalArgumentException(); // custom exception
        }
        try {
            var fileExtension = Files.getFileExtension(file.getOriginalFilename());
            File image = new File(IMAGES_STORED_PATH + userId.toString() + "." + fileExtension);
            image.createNewFile();
            file.transferTo(image.getAbsoluteFile());
        }
        catch (IOException exception) {
            throw new IllegalArgumentException(); // custom exception
        }
    }

}
