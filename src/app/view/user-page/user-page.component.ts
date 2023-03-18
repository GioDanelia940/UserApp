import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpServiceService } from 'src/app/shared-services/http-service.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  user!: any;
  constructor(
    private route: ActivatedRoute,
    private http: HttpServiceService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.http.getUserById(params['id']).subscribe((resp) => {
        this.user = resp;
      });
    });
  }
}
