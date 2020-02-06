import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-ui-pey-checks-image',
  templateUrl: './ui-pey-checks-image.component.html',
  styleUrls: ['./ui-pey-checks-image.component.scss']
})
export class UiPeyChecksImageComponent implements OnInit {
 
  file: File;
  fileNameFrente: string = "No hay imagen";
  fileNameDorso: string = "No hay imagen";
  
  constructor() {

  }

  ngOnInit() {

  }

  onChange(file: File) {
    if (file) {
      this.fileNameFrente = file.name;
      this.file = file;
      console.log(file);
      
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
    }


  }
}