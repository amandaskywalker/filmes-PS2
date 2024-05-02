package ps2.restapidb;

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


@RestController
public class FilmeController {

	@Autowired
	private FilmeRepo filmeRepo;

	@GetMapping("/filmes")
	Iterable<Filme> getFilmes() {
		return FilmeRepo.findAll();
	}

	@GetMapping("/filmes/{id}")
	Optional<Filme> getFilme(@PathVariable long id) {
		return FilmeRepo.findById(id);
	}

	@PostMapping("/create/filmes")
	Filme createFilme(@RequestBody Filme t) {
		Filme createdFilme = FilmeRepo.save(t);
		return createdFilme;
	}

	@PutMapping("/update/filmes/{FilmeId}")
	Optional<Filme> updateFilme(@RequestBody Filme FilmeRequest, @PathVariable long FilmeId) {
		Optional<Filme> opt = FilmeRepo.findById(FilmeId);
		if (opt.isPresent()) {
			if (FilmeRequest.getId() == FilmeId) {
				FilmeRepo.save(FilmeRequest);
				return opt;
			}
		}
		throw new ResponseStatusException(HttpStatus.NOT_FOUND,
				"Erro ao alterar dados do Filme com id " + FilmeId);
	}

	@DeleteMapping("/delete/filmes/{id}")
	void deleteFilme(@PathVariable long id) {
		FilmeRepo.deleteById(id);
	}

}