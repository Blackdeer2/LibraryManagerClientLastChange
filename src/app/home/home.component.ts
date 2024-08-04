import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public homeText: string | undefined;

  constructor() { }

  ngOnInit(): void {
    this.homeText = "WELCOME TO Library Manager APPLICATION";
  }
}