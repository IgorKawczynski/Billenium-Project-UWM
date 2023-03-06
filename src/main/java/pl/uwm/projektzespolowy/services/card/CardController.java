package pl.uwm.projektzespolowy.services.card;

import lombok.RequiredArgsConstructor;
import org.hibernate.cfg.NotYetImplementedException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.uwm.projektzespolowy.models.card.CardCreateDTO;
import pl.uwm.projektzespolowy.models.card.CardMovedDTO;
import pl.uwm.projektzespolowy.models.card.CardResponseDTO;
import pl.uwm.projektzespolowy.models.card.CardUpdateDTO;

import java.util.List;

@RestController
@RequestMapping("/api/cards")
@RequiredArgsConstructor
public class CardController {

    private final CardFacade cardFacade;

    @RequestMapping(method = RequestMethod.GET, params = {"cardId"})
    public CardResponseDTO getCardById(@RequestParam Long cardId) {
        return cardFacade.getCardById(cardId);
    }

    @RequestMapping(method = RequestMethod.GET, params = {"columnId"})
    public List<CardResponseDTO> getAllCardsByColumnId(@RequestParam Long columnId) {
        return cardFacade.getAllCardsByColumnId(columnId);
    }

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public CardResponseDTO addCardToColumn(@RequestBody CardCreateDTO cardCreateDTO) {
        return cardFacade.addCardToColumn(cardCreateDTO);
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

    @DeleteMapping("/{cardId}")
    public void deleteCardById(@PathVariable Long cardId) {
        cardFacade.deleteCard(cardId);
    }

}
