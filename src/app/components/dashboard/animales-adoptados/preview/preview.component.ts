import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<PreviewComponent>) { }

  ngOnInit(): void {
  }
  accion(nombre: string)
  {
    if(nombre=='cerrar')
    {
      this.dialogRef.close();
    }
  }
}
