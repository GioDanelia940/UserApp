import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../shared-services/loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private loader: LoaderService) {}
  ngOnInit(): void {
    this.loader.isLoading.subscribe((resp) => {
      this.isLoading = resp;
    });
  }
}
