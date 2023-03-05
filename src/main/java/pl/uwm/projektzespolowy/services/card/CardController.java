package pl.uwm.projektzespolowy.services.card;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import pl.uwm.projektzespolowy.services.card.crud.CardCRUDService;
import pl.uwm.projektzespolowy.models.card.CardCreateDTO;
import pl.uwm.projektzespolowy.models.card.CardResponseDTO;
import pl.uwm.projektzespolowy.models.card.CardUpdateDTO;

import java.util.List;

@RestController
@RequestMapping("/api/cards")
@RequiredArgsConstructor
public class CardController {

    private final CardCRUDService cardCRUDService;

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
        return cardCRUDService.addCardToColumn(cardCreateDTO);
    }

    @PutMapping("")
    @ResponseStatus(HttpStatus.OK)
    public CardResponseDTO updateCard(@RequestBody CardUpdateDTO cardUpdateDTO) {
        return cardCRUDService.updateCard(cardUpdateDTO);
    }

    @DeleteMapping("{cardId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteCard(@PathVariable Long cardId) {
        cardCRUDService.deleteCard(cardId);
    }

}
