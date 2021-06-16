package alianza.services;

import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import alianza.entity.Client;
import alianza.repository.ClientRepository;

@Service
public class ClientService {

	static Logger logger = Logger.getLogger(ClientService.class);

	@Autowired
	private ClientRepository repository;

	public List<Client> getClients() {
		return repository.findAll();
	}

	public Client addClient(Client client) {
		logger.info("Registro Agregado");
		return repository.save(client);
	}

	public List<Client>  getClientBySharedKey(String sharedKey) {
		logger.info("se lista clientes");
		return 	repository.getClientBySharedKeyContaining(sharedKey);
		
	}	

	public List<Client> getClientByAdvancedSearch(String sharedKey, String phone, String email, Date startDate,
			Date endDate) {
		logger.info("se lista clientes por filtros avanzados");
		return repository.getClientByAdvancedSearch(sharedKey, phone, email, startDate, endDate);
	}	
	
	public Integer contar() {
		return (int) repository.count();
	}

}
