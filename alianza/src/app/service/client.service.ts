import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../model/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private addClient: string = "http://localhost:8085/client/addClient";
  private getClients: string = "http://localhost:8085/client/getClients";
  private getClientBySharedKey: string = "http://localhost:8085/client/getClientBySharedKey/";
  private listarAdvanced: string = "http://localhost:8085/client/";

  constructor(private http: HttpClient) { }

  createClient(client: Client) {
    return this.http.post<Client>(this.addClient, client);
  }
  getClientsAll() {
    return this.http.get<Client[]>(this.getClients);
  }
 
  getClientsBySharedKey(sharedKey:string) {
    return this.http.get<Client[]>(this.getClientBySharedKey+sharedKey);
  }  
  
  searchAdvance(client: Client): Observable<Client[]> {
    return this.http.post<Client[]>(this.listarAdvanced + "getClientByAdvancedSearch", client);
  }
}
