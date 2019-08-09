import { Component, OnInit } from '@angular/core';
import { BuddyService } from '../buddy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buddy-add',
  templateUrl: './buddy-add.component.html',
  styleUrls: ['./buddy-add.component.css']
})
export class BuddyAddComponent implements OnInit {

  buddy: any = {};
  errorMessage: string;

  constructor(private buddyService: BuddyService,
    private router: Router) { }

  ngOnInit() {

  }

  createBuddy() {
    this.buddyService.addBuddy(this.buddy).subscribe(data => {
      alert('New Road Buddy Added');
      this.router.navigate(['/buddy']);
    });
  }

}
