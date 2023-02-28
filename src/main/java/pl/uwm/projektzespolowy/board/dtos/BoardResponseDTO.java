package pl.uwm.projektzespolowy.board.dtos;

import lombok.Builder;
import pl.uwm.projektzespolowy.column.dtos.ColumnDTO;
import pl.uwm.projektzespolowy.user.dtos.UserResponseDTO;

import java.util.List;

public record BoardResponseDTO(String title,
                               String creatorName,
                               List<UserResponseDTO> assignedUsers,
                               List<ColumnDTO> columnList) {

    @Builder public BoardResponseDTO {}
}
