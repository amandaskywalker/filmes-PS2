package ps2.restapidb.controlador;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import ps2.restapidb.entidade.Ator;
import ps2.restapidb.repositorio.AtorRepo;

@RestController
public class AtorController {

    @Autowired
    private AtorRepo atorRepo;

    public AtorController() {
    }

    @GetMapping("/atores")
    Iterable<Ator> getAtores() {
        return atorRepo.findAll();
    }

    @GetMapping("/atores/{id}")
    Optional<Ator> getAtor(@PathVariable long id) {
        return atorRepo.findById(id);
    }

    @PostMapping("/create/atores")
    Ator createAtor(@RequestBody Ator t) {
        Ator createdAtor = atorRepo.save(t);
        return createdAtor;
    }

    @PutMapping("/update/atores/{atorId}")
    Optional<Ator> updateAtor(@RequestBody Ator atorRequest, @PathVariable long atorId) {
        Optional<Ator> opt = atorRepo.findById(atorId);
        if (opt.isPresent()) {
            if (atorRequest.getId() == atorId) {
                atorRepo.save(atorRequest);
                return opt;
            }
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                "Erro ao alterar dados do Ator com id " + atorId);
    }

    @DeleteMapping("/delete/atores/{id}")
    void deleteAtor(@PathVariable long id) {
        atorRepo.deleteById(id);
    }
}
