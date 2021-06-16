import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng';
import { Client } from '../model/client.model';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {
  clients: Client[];
  respuestaModal: boolean = false;
  exitoso:boolean=false;

  searchText: string;
  form: FormGroup; 

  btnConsultarDisabled: boolean = true;
  first:number=0;
  valueEnvio: any[]=[];
  IDIOMA_CALENDARIO = {
		firstDayOfWeek: 0,
		dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
		dayNamesShort: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
		dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
		monthNames: [
			'Enero',
			'Febrero',
			'Marzo',
			'Abril',
			'Mayo',
			'Junio',
			'Julio',
			'Agosto',
			'Septiembre',
			'Octubre',
			'Noviembre',
			'Diciembre'
		],
		monthNamesShort: ['En', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Agto', 'Sep', 'Oct', 'Nov', 'Dic'],
		today: 'Hoy',
		clear: 'Limpiar',
		dateFormat: 'mm/dd/yy',
		weekHeader: 'Wk'
	};
  es: any; // Idioma del calendario
  mostrarAdvancedSearch: boolean=false;

  constructor(
    private serviceClient: ClientService,
    private formBuilder: FormBuilder
    ) {
    this.form = formBuilder.group({
      sharedKey: [''],
      email: [''],
      phone: [''],
      startDate:[''],
      endDate:[]
    });
   }

  ngOnInit(): void {    
    this.es = this.IDIOMA_CALENDARIO;
    this.consultar();
    
  }
  consultar() {
    this.serviceClient.getClientsAll().subscribe(data => {
      this.clients = data;
    })
  }
  verModal(){    
    this.respuestaModal=true;
  }

 
  closeModal(){
    if(this.exitoso){
      this.consultar();
      this.exitoso=false;
    }
  }
  verAdvancedSearch(){
    this.mostrarAdvancedSearch=true;
  }
  searchAdvanceServicio() {
    let client = new Client();
    client.sharedKey=this.form.value.sharedKey;
    client.email=this.form.value.email;
    client.phone=this.form.value.phone;
    client.startDate=this.form.value.startDate;
    client.endDate=this.form.value.endDate;
    if(this.form.value.endDate)client.endDate.setDate(client.endDate.getDate() + 1);
    this.serviceClient.searchAdvance(client).subscribe(data => {
      this.clients = data as Client[]
      
    })
  }
  advancedSearch(){    
    
      this.searchAdvanceServicio();
    
  }
  search() {
    this.form.reset();
    this.mostrarAdvancedSearch=false;
    console.log(this.searchText);
    if (this.searchText) {
      this.consultarPorSharedKey();
    } else {
      this.consultar();
    }

  }
  consultarPorSharedKey() {
    this.serviceClient.getClientsBySharedKey(this.searchText).subscribe(data => {
      this.clients = [];
      this.clients=data;

    })
  }
 
  exportar(){
    if(this.clients.length>0)this.downloadFile(this.clients);
  }
  downloadFile(data: any) {
    if(data){
      const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
      const header = Object.keys(data[0]);
      const csv = data.map((row) =>
        header
          .map((fieldName) => JSON.stringify(row[fieldName], replacer))
          .join(';')
      );
      csv.unshift(header.join(';'));
      const csvArray = csv.join('\r\n');
    
      const a = document.createElement('a');
      const blob = new Blob([csvArray], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
    
      a.href = url;
      a.download = 'clients.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    }
  }

}
