package pl.uwm.projektzespolowy.column;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/columns")
public class ColumnController {

    private final ColumnCRUDService service;

//    TODO: dto czy encja

}
