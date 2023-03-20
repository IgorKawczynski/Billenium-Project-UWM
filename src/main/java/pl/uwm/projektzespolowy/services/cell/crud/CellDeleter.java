package pl.uwm.projektzespolowy.services.cell.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CellDeleter {

    private final CellRepository cellRepository;

}
