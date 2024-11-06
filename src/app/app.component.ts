import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Event, EventType, Router, RouterOutlet } from '@angular/router';
import { RolesComponent } from './components/roles/roles.component';
import { MasterComponent } from './components/master/master.component';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MasterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.router.events.subscribe((event: Event) => {
      if(event.type == EventType.ActivationStart)
      {
        this.isLoad = true
      }else{
        this.isLoad = false;
      }
    })
  }
  title = 'angular_18_app';
  isLoad: boolean = false;
  router: Router = inject(Router)

  
}
