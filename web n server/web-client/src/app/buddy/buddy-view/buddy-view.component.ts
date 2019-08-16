import { Component, OnInit, NgZone } from '@angular/core';
import { Buddy } from '../../models/buddy';
import { BuddyService } from '../buddy.service';
import { Router } from '@angular/router';
import io from 'socket.io-client';

// const socket = io('http://192.168.43.23:3000/');
const socket = io('http://localhost:3000/');
@Component({
  selector: 'app-buddy-view',
  templateUrl: './buddy-view.component.html',
  styleUrls: ['./buddy-view.component.css']
})
export class BuddyViewComponent implements OnInit {

  buddies: Buddy[];
  errorMessage: any;
  
  constructor(private buddyService: BuddyService,
    private router: Router,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.buddies = new Array<Buddy>();
    this.displayBuddyList();
    socket.on('chak', (res) => {
      this.sockFunc(res);
    });
  }
  sockFunc(res: any) {
    // alert('chal bar');
    if (confirm('View updated list?')) {
      if (this.router.url == '/buddy/viewAll') {
        window.location.reload();
      } else {
        this.router.navigate(['/buddy/viewAll']);
        this.ngZone.run(() => this.displayBuddyList());
      }
    }
  }

  displayBuddyList(): void {
    this.buddyService.getList().subscribe(data => {
      this.buddies = data;
      console.log(this.buddies);
    });
  }

  onDeleteClick(id: any): void {
    if (!confirm('Are you sure to delete?')) {
      this.buddyService.deleteBuddy(id).subscribe( data => {
        alert('Buddy deleted');
        window.location.reload();
      }, error => {
        this.errorMessage = error;
      });
    }
  }
}
