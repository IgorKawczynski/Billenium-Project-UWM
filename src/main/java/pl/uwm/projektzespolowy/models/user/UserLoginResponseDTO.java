package pl.uwm.projektzespolowy.models.user;

import lombok.*;
import lombok.experimental.FieldDefaults;

@NoArgsConstructor
@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserLoginResponseDTO {

    Long id;
    String sessionId;
    String email;
    String firstName;
    String lastName;


}
