import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseModel } from '../model/interface/role';
import { environment } from '../../environments/environment';
import { Client } from '../model/class/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  GetAllClients():Observable<APIResponseModel>
  {
    return this.http.get<APIResponseModel>(environment.API_URL + "GetAllClients");
  }

  AddUpdate(obj:Client):Observable<APIResponseModel>
  {
    return this.http.post<APIResponseModel>(environment.API_URL + "AddUpdateClient", obj);
  }

  DeleteClientById(id:number):Observable<APIResponseModel>
  {
    return this.http.delete<APIResponseModel>(environment.API_URL + "DeleteClientByClientId?clientId="+id );
  }

  addClientProjectUpdate(obj:Client):Observable<APIResponseModel>
  {
    return this.http.post<APIResponseModel>(environment.API_URL + "AddUpdateClientProject", obj);
  }

  getAllMockUsers(){
    return this.http.get("https://jsonplaceholder.typicode.com/users");
  }
}
