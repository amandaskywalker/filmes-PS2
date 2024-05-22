package ps2.restapidb.repositorio;

import org.springframework.data.repository.CrudRepository;

import ps2.restapidb.entidade.Filme;

public interface FilmeRepo extends CrudRepository<Filme, Long> {
 
}
