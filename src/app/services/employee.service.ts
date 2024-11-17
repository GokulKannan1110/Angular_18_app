import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { APIResponseModel } from '../model/interface/role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  httpClient = inject(HttpClient);

  getAllEmployees(): Observable<APIResponseModel>{
    return this.httpClient.get<APIResponseModel>(environment.API_URL + '/GetAllEmployee');
  }
}
