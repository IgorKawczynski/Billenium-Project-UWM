package pl.uwm.projektzespolowy.models.card;

import lombok.Builder;
import pl.uwm.projektzespolowy.models.checkbox.Checkbox;
import pl.uwm.projektzespolowy.models.user.UserResponseDTO;

import java.util.List;

public record CardResponseDTO(String id,
                              String title,
                              String description,
                              Integer position,
                              String color,
                              List<UserResponseDTO> assignedUsers,
                              List<Checkbox> checkboxes) {

    @Builder public CardResponseDTO {}

}
