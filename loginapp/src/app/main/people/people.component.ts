import { Person } from './../person';
import { Observable } from 'rxjs';
import { MainService } from './../main.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  people$!: Observable<Person[] | any>

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.people$ = this.mainService.getPeople()
  }

}
