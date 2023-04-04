package pl.uwm.projektzespolowy.services.user;

import com.google.common.io.Files;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import pl.uwm.projektzespolowy.exceptions.fileexceptions.EmptyFileException;
import pl.uwm.projektzespolowy.exceptions.fileexceptions.IllegalFileExtensionException;
import pl.uwm.projektzespolowy.exceptions.fileexceptions.IllegalFileSizeException;

import java.util.List;

@Component
@RequiredArgsConstructor
class UserAvatarValidator {

    public final static List<String> ALLOWED_AVATAR_EXTENSIONS = List.of("jpeg", "jpg", "png", "gif");
    public final static Long MAXIMUM_SIZE_IN_BYTES = 128000L;

    public void validate(MultipartFile userAvatar) {
        if (userAvatar.isEmpty() || userAvatar.getOriginalFilename() == null) {
            throw new EmptyFileException("File can not be empty.");
        }
        if (!hasAllowedExtension(userAvatar)) {
            throw new IllegalFileExtensionException("User avatar must be one of jpeg, jpg, png or gif file.");
        }
        if (!hasAllowedSize(userAvatar)) {
            throw new IllegalFileSizeException("The image size must be lass than 128kB.");
        }
    }

    private boolean hasAllowedExtension(MultipartFile userAvatar) {
        var userAvatarExtension = Files.getFileExtension(userAvatar.getOriginalFilename());
        return ALLOWED_AVATAR_EXTENSIONS.stream()
                .anyMatch(extension -> extension.equals(userAvatarExtension));
    }

    private boolean hasAllowedSize(MultipartFile userAvatar) {
        return userAvatar.getSize() < MAXIMUM_SIZE_IN_BYTES;
    }

}
