import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponseModel } from '../model/interface/role';
import { environment } from '../../environments/environment';
import { Client } from '../model/class/Client';
import { Constant } from '../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  GetAllClients():Observable<APIResponseModel>
  {
    return this.http.get<APIResponseModel>(environment.API_URL + Constant.API_METHOD.GET_ALL_CLIENT);
  }

  AddUpdate(obj:Client):Observable<APIResponseModel>
  {
    return this.http.post<APIResponseModel>(environment.API_URL + Constant.API_METHOD.ADD_UPDATE_CLIENT, obj);
  }

  DeleteClientById(id:number):Observable<APIResponseModel>
  {
    return this.http.delete<APIResponseModel>(environment.API_URL + Constant.API_METHOD.DELETE_CLIENT_BY_CLIENTID +"?clientId="+id );
  }

  addClientProjectUpdate(obj:Client):Observable<APIResponseModel>
  {
    return this.http.post<APIResponseModel>(environment.API_URL + Constant.API_METHOD.ADD_UPDATE_CLIENT_PROJECT, obj);
  }

  getAllMockUsers(){
    return this.http.get("https://jsonplaceholder.typicode.com/users");
  }

  getAllClientProjects(): Observable<APIResponseModel>{
    return this.http.get<APIResponseModel>(environment.API_URL + Constant.API_METHOD.GET_ALL_CLIENT_PROJECTS)
  }
}
