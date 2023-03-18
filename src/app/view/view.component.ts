import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../shared-services/http-service.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  users: any[] = [];
  constructor(private http: HttpServiceService) {}
  ngOnInit(): void {
    this.http.getAllUsers().subscribe((resp) => {
      this.users = resp;
    });
  }
}
