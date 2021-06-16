package alianza;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import alianza.entity.Client;
import alianza.repository.ClientRepository;
import alianza.services.ClientService;

@SpringBootTest
class ApplicationTests {
	Date fecha = new Date();
	@Test
	void contextLoads() {
	}
	
	@Mock
	private ClientRepository clientRepository;

	@InjectMocks // auto inject helloRepository
	private ClientService service = new ClientService();

	@BeforeEach
	public void setup() {
		List<Client>listOne = new ArrayList<>();
	
		Client clienteOne = new Client(0, "A", "A", "A", "A", fecha);
		listOne.add(clienteOne);
		Client clienteTwo = new Client(1, "B", "B", "B", "B", fecha);
		listOne.add(clienteTwo);
		
		when(clientRepository.count()).thenReturn((long) 2);
		when(clientRepository.findAll()).thenReturn(listOne);
		
	}

	@DisplayName("Test count registers")
	@Test
	void testGet() {
		long cantidad = 2;
		long salida = service.contar().longValue();
		assertEquals(cantidad, salida);
	}
	
	@DisplayName("Test List Clients")
	@Test
	void listar() {
		Integer cantidadElementos = 2;
		Integer cantidadLista =  service.getClients().size();
		assertNotNull(service.getClients());
		assertEquals(cantidadElementos,cantidadLista);
	}
	
	@DisplayName("Test Save Clients with parameters ok")
	@Test
	void SaveClient() {
		Client clienteOne = new Client(0, "A", "A", "A", "A", fecha);
		Client clienteTwo = new Client(1, "B", "B", "B", "B", fecha);
		when(clientRepository.save(clienteOne)).thenReturn(clienteTwo);		
		Client salida = (service.addClient(clienteOne));
		assertNotNull(salida);
	}
	
	@DisplayName("Save Client When Id Is Zero And ShareKey Is Null")
	@Test
	void SaveClientWhenIdIsZeroAndShareKeyIsNull() {
		Client clienteOne = new Client(0, null, "A", "A", "A", fecha);		
		when(clientRepository.save(clienteOne)).thenReturn(null);		
		Client salida = service.addClient(clienteOne);		
		assertNull(salida);
	}
	
	@DisplayName("Save Client When Id Is diff Zero And ShareKey Is Null")
	@Test
	void SaveClientWhenIdIsDiffZeroAndShareKeyIsNull() {
		Client clienteOne = new Client(1, null, "A", "A", "A", fecha);		
		when(clientRepository.save(clienteOne)).thenReturn(null);		
		Client salida = service.addClient(clienteOne);		
		assertNull(salida);
	}
	
	@DisplayName("Save Client When Id Is diff Zero And ShareKey Is Diff Null")
	@Test
	void SaveClientWhenIdIsZeroAndShareKeyIsDiffNull() {
		Client clienteOne = new Client(1, "A", "A", "A", "A", fecha);		
		when(clientRepository.save(clienteOne)).thenReturn(null);		
		Client salida = service.addClient(clienteOne);		
		assertNull(salida);
	}
	
	
	
	

}
