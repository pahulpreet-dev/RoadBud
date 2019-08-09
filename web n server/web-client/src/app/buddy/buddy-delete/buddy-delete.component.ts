import { Component, OnInit } from '@angular/core';
import { Buddy } from 'src/app/models/buddy';
import { BuddyService } from '../buddy.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-buddy-delete',
  templateUrl: './buddy-delete.component.html',
  styleUrls: ['./buddy-delete.component.css']
})
export class BuddyDeleteComponent implements OnInit {

  buddyId: any;
  constructor(private buddyService: BuddyService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.buddyId = new Buddy().id;
    this.activatedRoute.params.subscribe(params => {
      this.buddyId = params.id;
    });
    this.buddyService.deleteBuddy(this.buddyId).subscribe( res => {
      alert('Buddy Deleted');
      this.router.navigate(['/buddy/viewAll']);
    }, error => {
      console.log(error);
    });
  }

}
