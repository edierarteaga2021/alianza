import { Output } from '@angular/core';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../model/client.model';
import { ClientService } from '../service/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  @Input() respuestaModal: boolean = false;
  @Input() exitoso: boolean = false;
	@Output() cambiarValor = new EventEmitter<boolean>();
  @Output() cambiarValor2 = new EventEmitter<boolean>();
  minDateValue: Date = new Date();
  maxDateValue: Date = new Date();
  deadline: Date = new Date();
  clientTmp = new Client;

  form: FormGroup; 
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
  constructor(
    private serviceClient: ClientService,
    private formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
      sharedKey: [''],
      businessId: [''],
      email: ['',[Validators.email]],
      phone: [''],
      dateAdd: ['']
    
 
    });
   }

  ngOnInit(): void {
    this.es = this.IDIOMA_CALENDARIO;
  }
  /**
	 * Método para emitir el cambio de la variable que muestra el modal.
	 */
	cerrarModal() {
		this.respuestaModal = false; // Modificamos el valor de la variable que muestra el popup
		this.cambiarValor.emit(this.respuestaModal); // Emitimos el cambio de valor en la variable que muestra el popup
    this.cambiarValor2.emit(this.exitoso); // Emitimos el cambio de valor en la variable que muestra el popup
    
    console.log(this.cambiarValor);
	}
  submit() {
    if (this.form.valid) {
      this.guardar();
    }
    else{
      alert("los campos marcados con (*) son obligatorios");
    }
  }
  guardar() {
    let date: Date = new Date(new Date().toDateString());
    this.clientTmp.businessId = this.form.value.businessId;
    this.clientTmp.sharedKey = this.form.value.sharedKey;
    this.clientTmp.phone = (this.form.value.phone?this.form.value.phone:"");
    this.clientTmp.email = this.form.value.email;    
    this.clientTmp.dateAdd = this.form.value.dateAdd;
    this.serviceClient.createClient(this.clientTmp).subscribe(data => {
      this.exitoso = true; // Modificamos el valor de la variable que muestra el popup
      this.cerrarModal();
      this.form.reset();
      this.minDateValue= new Date();
      this.maxDateValue = new Date();
      this.deadline= new Date();
      alert("se agrego con exito");
    })
  }

}
