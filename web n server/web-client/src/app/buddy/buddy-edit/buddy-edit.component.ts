import { Component, OnInit } from '@angular/core';

import { Buddy } from '../../models/buddy';
import { BuddyService } from '../buddy.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buddy-edit',
  templateUrl: './buddy-edit.component.html',
  styleUrls: ['./buddy-edit.component.css']
})
export class BuddyEditComponent implements OnInit {

  buddy: Buddy;
  errorMessage: string;

  constructor(private buddyService: BuddyService,
              private activatedRouter: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.buddy = new Buddy();
    this.activatedRouter.params.subscribe(params => {
      this.buddy.id = this.activatedRouter.snapshot.paramMap.get('id');
    });
    this.getBuddyDetails();
  }
  getBuddyDetails() {
    this.buddyService.getBuddy(this.buddy).subscribe(data => {
      this.buddy = data;
    });
  }

  editBuddy() {
    this.buddyService.editBuddy(this.buddy).subscribe(data => {
      alert('Buddy details updated');
      this.router.navigate(['/buddy/viewAll']);
    }, error => {
      this.errorMessage = error;
    });
  }

}
