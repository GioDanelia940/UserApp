import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { HttpServiceService } from '../shared-services/http-service.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit, AfterViewInit {
  users: any[] = [];
  currentPage!: number;
  @ViewChildren('lastCard', { read: ElementRef })
  lastCard: QueryList<ElementRef> | undefined;
  observer: any;

  constructor(private http: HttpServiceService) {}

  ngOnInit(): void {
    this.currentPage = 1;
    this.http.getUsersByPage(this.currentPage).subscribe((resp) => {
      this.users = resp;
    });
    this.IntersectionObserver();
  }

  ngAfterViewInit(): void {
    this.lastCard?.changes.subscribe((entry) => {
      if (entry.last) {
        this.observer.observe(entry.last.nativeElement);
      }
    });
  }

  IntersectionObserver() {
    let options = {
      root: null,
      rootMargin: '0px',
      threshhold: 0,
      trackVisibility: true,
      delay: 100,
    };
    this.observer = new IntersectionObserver((entries) => {
      if (entries[entries.length - 1].isIntersecting) {
        this.http.getUsersByPage(this.currentPage + 1).subscribe((resp) => {
          this.currentPage += 1;
          this.users.push(...resp);
        });
      }
    });
  }
}
