package pl.uwm.projektzespolowy.board.dtos;

import lombok.Builder;
import pl.uwm.projektzespolowy.column.dtos.ColumnDTO;
import pl.uwm.projektzespolowy.user.User;

import java.util.List;
import java.util.Set;

public record BoardResponseDTO(String title,
                               String creatorName,
                               Set<User> assignedUsers,
                               List<ColumnDTO> columnList) {

    @Builder public BoardResponseDTO {}
}
