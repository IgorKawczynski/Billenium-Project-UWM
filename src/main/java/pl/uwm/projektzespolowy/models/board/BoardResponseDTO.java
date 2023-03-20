package pl.uwm.projektzespolowy.models.board;

import lombok.Builder;
import pl.uwm.projektzespolowy.models.column.ColumnResponseDTO;
import pl.uwm.projektzespolowy.models.row.RowResponseDTO;
import pl.uwm.projektzespolowy.models.user.UserResponseDTO;

import java.util.List;

public record BoardResponseDTO(String id,
                               String title,
                               String creatorName,
                               List<UserResponseDTO> assignedUsers,
                               List<ColumnResponseDTO> columnList,
                               List<RowResponseDTO> rowList) {

    @Builder public BoardResponseDTO {}

}
