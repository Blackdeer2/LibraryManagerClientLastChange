import { Component } from '@angular/core';

@Component({
  selector: 'app-internal-server',
  templateUrl: './internal-server.component.html',
  styleUrl: './internal-server.component.css'
})
export class InternalServerComponent {
  errorMessage: string = "500 SERVER ERROR, CONTACT ADMINISTRATOR!!!!";
}
