package pl.uwm.projektzespolowy.card;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.uwm.projektzespolowy.card.crud.CardCRUDService;
import pl.uwm.projektzespolowy.models.card.CardCreateDTO;
import pl.uwm.projektzespolowy.models.card.CardResponseDTO;
import pl.uwm.projektzespolowy.models.card.CardUpdateDTO;

@RestController
@RequestMapping("/api/cards")
@RequiredArgsConstructor
public class CardController {

    private final CardCRUDService cardCRUDService;

    @GetMapping("/{cardId}")
    public CardResponseDTO getCardById(@PathVariable Long cardId) {
        return cardCRUDService.getCardById(cardId).toDto();
    }

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public CardResponseDTO addCardToColumn(@RequestBody CardCreateDTO cardCreateDTO) {
        return cardCRUDService.addCardToColumn(cardCreateDTO).toDto();
    }

    @PatchMapping("")
    @ResponseStatus(HttpStatus.OK)
    public CardResponseDTO updateCard(@RequestBody CardUpdateDTO cardUpdateDTO) {
        return cardCRUDService.updateCard(cardUpdateDTO).toDto();
    }

}
