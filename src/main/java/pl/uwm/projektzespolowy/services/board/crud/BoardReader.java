package pl.uwm.projektzespolowy.services.board.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.exceptions.EntityNotFoundException;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.user.User;

import java.util.List;

@Component
@RequiredArgsConstructor
class BoardReader {

    private final BoardRepository boardRepository;

    public Board getBoardById(Long boardId) {
        return boardRepository.findById(boardId)
                .orElseThrow(() -> new EntityNotFoundException("board", "Board with id: " + boardId + " does not exist!"));
    }

    public List<User> getBoardAssignedUsers(Long boardId) {
        return boardRepository.getAllAssignedUsers(boardId);
    }

    public Board getBoardByCardId(Long cardId) {
        return boardRepository.getBoardByCardId(cardId);
    }

    public Integer getAmountOfAssignedCardsToUser(User user, Long boardId) {
        return boardRepository.getAmountOfAssignedCardsToUser(user, boardId);
    }

}
