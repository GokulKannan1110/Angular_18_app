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
    this.loadClients();
  }

loadClients(){
  this.clientService.GetAllClients().subscribe((result:APIResponseModel) => {
    this.clientList = result.data;
  })
}

  onSaveClient(){
    this.clientService.AddUpdate(this.clientObj).subscribe((res:APIResponseModel) => {
      if(res.result){
        const action = (this.clientObj.clientId != 0) ? 'Updated' : 'Created'
         alert('Client '+ action+' Succesfully!');
        this.loadClients();
        this.clientObj = new Client();
      }else{
        alert(res.message);
      }
    })
  }

  EditClient(client: Client){
    this.clientObj = client;
  }

  DeleteClient(clientId : number){
    const isDelete = confirm('Are you sure want to delete?');
    if(isDelete)
    {
      this.clientService.DeleteClientById(clientId).subscribe((res:APIResponseModel) => {
        if(res.result){
          alert('Client Deleted Succesfully!');
          this.loadClients();
        }else{
          alert(res.message);
        }
      })
    }
  }
}
