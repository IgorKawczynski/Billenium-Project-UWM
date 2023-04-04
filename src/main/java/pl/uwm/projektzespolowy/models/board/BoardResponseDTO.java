package pl.uwm.projektzespolowy.models.board;

import lombok.Builder;
import pl.uwm.projektzespolowy.models.color.ColorResponseDTO;
import pl.uwm.projektzespolowy.models.column.ColumnResponseDTO;
import pl.uwm.projektzespolowy.models.row.RowResponseDTO;
import pl.uwm.projektzespolowy.models.user.UserBoardAssignmentDTO;

import java.util.List;

public record BoardResponseDTO(String id,
                               String title,
                               String creatorName,
                               List<UserBoardAssignmentDTO> assignedUsers,
                               List<ColumnResponseDTO> columnList,
                               List<RowResponseDTO> rowList,
                               List<ColorResponseDTO> colorList,
                               String wipLimit) {

    @Builder public BoardResponseDTO {}

}
