package pl.uwm.projektzespolowy.card;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.uwm.projektzespolowy.card.crud.CardCRUDService;
import pl.uwm.projektzespolowy.card.dtos.CardCreateDTO;
import pl.uwm.projektzespolowy.card.dtos.CardDTO;

@RestController
@RequestMapping("/api/cards")
@RequiredArgsConstructor
public class CardController {

    private final CardCRUDService cardCRUDService;

    @GetMapping("/{cardId}")
    public CardDTO getCardById(@PathVariable Long cardId) {
        return cardCRUDService.getCardById(cardId).toDto();
    }

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public CardDTO addCardToColumn(@RequestBody CardCreateDTO cardCreateDTO) {
        return cardCRUDService.addCardToColumn(cardCreateDTO).toDto();
    }

}
