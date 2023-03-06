package pl.uwm.projektzespolowy.services.card;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.uwm.projektzespolowy.models.card.CardCreateDTO;
import pl.uwm.projektzespolowy.models.card.CardResponseDTO;
import pl.uwm.projektzespolowy.models.card.CardUpdateDTO;

@RestController
@RequestMapping("/api/cards")
@RequiredArgsConstructor
public class CardController {

    private final CardFacade cardFacade;

    @GetMapping("/")
    public List<CardResponseDTO> getAllCards() {
        return cardCRUDService.getAllCards();
    }

    @RequestMapping(method = RequestMethod.GET, params = {"cardId"})
    public CardResponseDTO getCardById(@RequestParam Long cardId) {
        return cardCRUDService.getCardById(cardId);
    }

    @RequestMapping(method = RequestMethod.GET, params = {"columnId"})
    public List<CardResponseDTO> getAllCardsByColumnId(@RequestParam Long columnId) {
        return cardCRUDService.getAllCardsByColumnId(columnId);
    }

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public CardResponseDTO addCardToColumn(@RequestBody CardCreateDTO cardCreateDTO) {
        return cardCRUDService.addCardToColumn(cardCreateDTO).toDto();
    }

    @PutMapping("")
    @ResponseStatus(HttpStatus.OK)
    public CardResponseDTO updateCard(@RequestBody CardUpdateDTO cardUpdateDTO) {
        return cardFacade.updateCard(cardUpdateDTO);
    }

    @PutMapping("/another-column")
    @ResponseStatus(HttpStatus.OK)
    public CardResponseDTO moveCardToAnotherColumn(@RequestBody CardMovedDTO cardMovedDTO) {
        return cardFacade.moveCardToAnotherColumn(cardMovedDTO);
    }

    @PutMapping("/same-column")
    @ResponseStatus(HttpStatus.OK)
    public CardResponseDTO moveCard(@RequestBody CardMovedDTO cardMovedDTO) {
        throw new NotYetImplementedException();
    }

}
