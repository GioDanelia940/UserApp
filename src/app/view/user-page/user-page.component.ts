import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpServiceService } from 'src/app/shared-services/http-service.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  user!: any;
  userId!: number;
  friends: any = [];
  friendsIds!: any;
  currentPage: number = 1;
  @ViewChildren('lastFriend', { read: ElementRef })
  lastCard: QueryList<ElementRef> | undefined;
  observer!: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpServiceService
  ) {}

  ngOnInit(): void {
    this.IntersectionObserver();
    this.route.params.subscribe((params: Params) => {
      this.http.getUserById(params['id']).subscribe((resp) => {
        this.user = resp;
      });
      this.http.getFriendsByPage(params['id'], 1).subscribe((resp) => {
        this.friendsIds = resp.map((element: any) => element.value);
        this.friendsIds.forEach((element: any, index: number, array: any) => {
          this.http.getUserById(element).subscribe((resp) => {
            this.friends.push(resp);
          });
        });
      });
    });
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
      threshhold: 0.1,
    };
    this.observer = new IntersectionObserver((entries) => {
      if (entries[entries.length - 1].isIntersecting) {
        this.currentPage += 1;
        this.route.params.subscribe((params: Params) => {
          this.http
            .getFriendsByPage(params['id'], this.currentPage)
            .subscribe((resp) => {
              this.friendsIds = resp.map((element: any) => element.value);
              this.friendsIds.forEach(
                (element: any, index: number, array: any) => {
                  this.http.getUserById(element).subscribe((resp) => {
                    this.friends.push(resp);
                  });
                }
              );
            });
        });
      }
    });
  }
}
