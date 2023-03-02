package pl.uwm.projektzespolowy.models.board;

import lombok.Builder;
import pl.uwm.projektzespolowy.models.column.ColumnResponseDTO;
import pl.uwm.projektzespolowy.models.user.UserResponseDTO;

import java.util.List;

public record BoardResponseDTO(String title,
                               String creatorName,
                               List<UserResponseDTO> assignedUsers,
                               List<ColumnResponseDTO> columnList) {

    @Builder public BoardResponseDTO {}
}
