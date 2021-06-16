package alianza.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import alianza.entity.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {

	@Query(value = "SELECT * FROM client c WHERE c.shared_key LIKE  CONCAT('%',?1,'%') "
			+ "AND c.phone LIKE CONCAT('%',?2,'%') AND c.email LIKE CONCAT('%',?3,'%') "
			+ "AND c.date_add >=  if(?4 IS NULL,'1500-01-01',?4) AND c.date_add <= if(?5 IS NULL,'9999-12-31',?5)", nativeQuery = true)
	List<Client> getClientByAdvancedSearch(String sharedKey, String phone, String email, Date startDate, Date endDate);
	
	List<Client> getClientBySharedKey(String sharedKey);

}
