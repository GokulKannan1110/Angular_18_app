import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { ClientService } from '../../services/client.service';
import { APIResponseModel, Employee } from '../../model/interface/role';
import { Client } from '../../model/class/Client';

@Component({
  selector: 'app-client-project',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css'
})
export class ClientProjectComponent implements OnInit {
  
  employeeService = inject(EmployeeService);
  clientService = inject(ClientService);
  employeeList: Employee[] = [];
  clientList: Client[] = [];

  ngOnInit(): void {    
    this.getAllEmployees();
    this.getAllClients();
  }
  
  //form
  projectForm: FormGroup = new FormGroup({
    clientProjectId : new FormControl("0"),
    projectName: new FormControl("", [Validators.required,Validators.minLength(4)]),
    startDate: new FormControl(""),
    expectedEndDate: new FormControl(""),
    leadByEmpId: new FormControl(""),
    completedDate:new FormControl(""),
    contactPerson: new FormControl(""),
    contactPersonContactNo: new FormControl(""),
    totalEmpWorking: new FormControl(""),
    projectCost: new FormControl(""),
    projectDetails: new FormControl(""),
    contactPersonEmailId: new FormControl(""),
    clientId: new FormControl("")
  })

  getAllEmployees(){
    this.employeeService.getAllEmployees().subscribe((resp: APIResponseModel) => {
      this.employeeList = resp.data;
    })    
  }

  getAllClients(){
    this.clientService.GetAllClients().subscribe((resp: APIResponseModel) => {
      this.clientList = resp.data;
    })    
  }
 
  OnSaveProject(){
    const formValue = this.projectForm.value;
    debugger;
    this.clientService.addClientProjectUpdate(formValue).subscribe((res: APIResponseModel) => {
      if(res.result){
        alert('Project Created Successfully!');
      }else{
        alert(res.message);
      }
    })
  }
}
