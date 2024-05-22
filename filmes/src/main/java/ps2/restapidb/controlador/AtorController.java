package ps2.restapidb.controlador;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import ps2.restapidb.entidade.Ator;
import ps2.restapidb.repositorio.AtorRepo;

@RestController
@RequestMapping("/atores")
public class AtorController {

    @Autowired
    private AtorRepo atorRepo;

    public AtorController() {
    }

    @GetMapping
    public Iterable<Ator> getAtores() {
        return atorRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ator> getAtor(@PathVariable long id) {
        Optional<Ator> ator = atorRepo.findById(id);
        if (ator.isPresent()) {
            return ResponseEntity.ok(ator.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/create")
    public Ator createAtor(@RequestBody Ator t) {
        return atorRepo.save(t);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Ator> updateAtor(@RequestBody Ator atorRequest, @PathVariable long id) {
        Optional<Ator> opt = atorRepo.findById(id);
        if (opt.isPresent()) {
            if (atorRequest.getId().equals(id)) {
                atorRepo.save(atorRequest);
                return ResponseEntity.ok(opt.get());
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "ID do corpo da solicitação não corresponde ao ID do caminho");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Erro ao alterar dados do Ator com id " + id);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAtor(@PathVariable long id) {
        Optional<Ator> opt = atorRepo.findById(id);
        if (opt.isPresent()) {
            atorRepo.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
