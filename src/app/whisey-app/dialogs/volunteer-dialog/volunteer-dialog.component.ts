import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-volunteer-dialog',
  templateUrl: './volunteer-dialog.component.html',
  styleUrls: ['./volunteer-dialog.component.css']
})
export class VolunteerDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

}