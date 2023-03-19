import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-friend-item',
  templateUrl: './friend-item.component.html',
  styleUrls: ['./friend-item.component.css'],
})
export class FriendItemComponent {
  @Input() friend!: any;
}
