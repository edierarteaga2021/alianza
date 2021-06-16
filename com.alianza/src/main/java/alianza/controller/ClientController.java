package alianza.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



import alianza.entity.Client;
import alianza.entity.ClientTmp;
import alianza.services.ClientService;

@CrossOrigin("*")
@RestController
@RequestMapping("client")
public class ClientController {

	@Autowired
	private ClientService service;
	
	@PostMapping("/addClient")
	public Client addClient(@RequestBody Client client) {
		return service.addClient(client);
	}

	@GetMapping("/getClients")
	public List<Client> getClients() {
		return service.getClients();
	}

	

	@GetMapping("/getClientBySharedKey/{sharedKey}")
	public List<Client> getClientBySharedKey(@PathVariable("sharedKey") String sharedKey) {
		return service.getClientBySharedKey(sharedKey);
	}
	
	
	@PostMapping("/getClientByAdvancedSearch")
	public List<Client> getClientByAdvancedSearch(@RequestBody ClientTmp clientTmp) {
		String sharedkey = clientTmp.getSharedKey();
		String phone = clientTmp.getPhone();
		String email = clientTmp.getEmail();
		Date startDate = clientTmp.getStartDate();
		Date endDate = clientTmp.getEndDate();
		return service.getClientByAdvancedSearch(sharedkey, phone, email, startDate, endDate);
	}
	
	

}
