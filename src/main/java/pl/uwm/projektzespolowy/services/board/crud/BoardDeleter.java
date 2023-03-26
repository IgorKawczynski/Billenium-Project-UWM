package pl.uwm.projektzespolowy.services.board.crud;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.uwm.projektzespolowy.exceptions.EntityNotFoundException;
import pl.uwm.projektzespolowy.models.board.Board;
import pl.uwm.projektzespolowy.models.board.BoardUserUpdateDTO;
import pl.uwm.projektzespolowy.models.user.User;

import java.util.List;
import java.util.Objects;
import java.util.function.Predicate;

@Component
@RequiredArgsConstructor
class BoardDeleter {

    private final BoardRepository boardRepository;

    public void deleteBoardById(Long id) {
        boardRepository.deleteById(id);
    }

    public List<User> deleteAssignedUserFromBoard(BoardUserUpdateDTO boardUserUpdateDTO) {

        var boardId = Long.parseLong(boardUserUpdateDTO.boardId());
        var boardToChange = boardRepository
                .findById(boardId)
                .orElseThrow( () -> new EntityNotFoundException("board", "Board with id: " + boardId + " does not exist!"));;
        var userEmail = boardUserUpdateDTO.userEmail();

        Predicate<User> isThisUser = user -> Objects.equals(user.getEmail(), userEmail);
        boardToChange.getAssignedUsers().removeIf(isThisUser);

        boardRepository.saveAndFlush(boardToChange);
        return boardToChange.getAssignedUsers().stream().toList();
    }

}
