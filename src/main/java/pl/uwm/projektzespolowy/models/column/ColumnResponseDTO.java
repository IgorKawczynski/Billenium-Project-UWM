package pl.uwm.projektzespolowy.models.column;

import lombok.Builder;
import pl.uwm.projektzespolowy.models.cell.CellResponseDTO;

import java.util.List;

public record ColumnResponseDTO(String id,
                                String title,
                                Integer cardsLimit,
                                Integer position,
                                List<CellResponseDTO> cells) {

    @Builder public ColumnResponseDTO {}

}
