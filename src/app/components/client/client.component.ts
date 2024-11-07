import { Component, inject } from '@angular/core';
import { Client } from '../../model/class/Client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel } from '../../model/interface/role';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  clientObj: Client = new Client();
  clientList: Client[] = [];
  clientService: ClientService = inject(ClientService);

  ngOnInit()
  {
    this.clientService.GetAllClients().subscribe((result:APIResponseModel) => {
      this.clientList = result.data;
    })
  }
  onSaveClient(){

  }

}
