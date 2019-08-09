import { Component, OnInit } from '@angular/core';
import { Buddy } from '../../models/buddy';
import { BuddyService } from '../buddy.service';
import { Router } from '@angular/router';
import io from 'socket.io-client';

const socket = io('http://192.168.2.24:3000/');

@Component({
  selector: 'app-buddy-view',
  templateUrl: './buddy-view.component.html',
  styleUrls: ['./buddy-view.component.css']
})
export class BuddyViewComponent implements OnInit {

  buddies: Buddy[];
  errorMessage: any;
  
  constructor(private buddyService: BuddyService,
    private router: Router) { }

  ngOnInit() {
    this.buddies = new Array<Buddy>();
    this.displayBuddyList();
    socket.on('chak', (res) => {
      this.sockFunc(res);
    });
  }
  sockFunc(res: any) {
    console.log(res);
    alert('chal bar');
  }

  displayBuddyList(): void {
    this.buddyService.getList().subscribe(data => {
      this.buddies = data;
      console.log(this.buddies);
    });
  }

}
