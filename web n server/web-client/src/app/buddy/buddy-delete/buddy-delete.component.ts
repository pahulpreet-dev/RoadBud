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

  buddy: Buddy;
  constructor(private buddyService: BuddyService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.buddy = new Buddy();
    this.activatedRoute.params.subscribe(params => {
      this.buddy.service_type = params.service;
      this.buddy.id = params.id;
    });
    this.buddyService.deleteBuddy(this.buddy).subscribe( res => {
      alert('Buddy Deleted');
      this.router.navigate(['/buddy/viewAll']);
    }, error => {
      console.log(error);
    });
  }

}
