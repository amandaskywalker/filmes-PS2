package ps2.restapidb.repositorio;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ps2.restapidb.entidade.Ator;

@Repository
public interface AtorRepo extends CrudRepository<Ator, Long> {
}
