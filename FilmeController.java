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
@RequestMapping("/filmes")
public class FilmeController {

    // Lista de filmes
    private List<Filme> filmes = new ArrayList<>();

    //adicionar um novo filme
    @PostMapping
    public ResponseEntity<Object> adicionarFilme(@RequestBody Filme filme) {
        filme.setId((long) (filmes.size() + 1));
        filmes.add(filme);
        return ResponseEntity.ok().build();
    }

    //obter todos os filmes
    @GetMapping
    public List<Filme> listarFilmes() {
        return filmes;
    }

    //obter filme por ID
    @GetMapping("/{id}")
    public ResponseEntity<Filme> obterFilmePorId(@PathVariable Long id) {
        Optional<Filme> filme = filmes.stream().filter(f -> f.getId().equals(id)).findFirst();
        return filme.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    //atualizar um filme
    @PutMapping("/{id}")
    public ResponseEntity<Object> atualizarFilme(@PathVariable Long id, @RequestBody Filme filmeAtualizado) {
        Optional<Filme> filme = filmes.stream().filter(f -> f.getId().equals(id)).findFirst();
        if (filme.isPresent()) {
            Filme f = filme.get();
            f.setTitulo(filmeAtualizado.getTitulo());
            f.setDiretor(filmeAtualizado.getDiretor());
            f.setAnoLancamento(filmeAtualizado.getAnoLancamento());
            f.setGenero(filmeAtualizado.getGenero());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //deletar filme
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletarFilme(@PathVariable Long id) {
        Optional<Filme> filme = filmes.stream().filter(f -> f.getId().equals(id)).findFirst();
        if (filme.isPresent()) {
            filmes.remove(filme.get());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}