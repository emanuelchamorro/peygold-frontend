import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

@Injectable()
export class NgbDateFRParserFormatter extends NgbDateParserFormatter{  
    
    parse(value: string): any { //parse receive your string dd/mm/yyy
        //return a NgbDateStruct
        //calculate year,month and day from "value"
       const elementDate = value.split("/");
       return {"year":parseInt(elementDate[2]),
               "month":parseInt(elementDate[1]),
               "day":parseInt(elementDate[0])}
   }

   format(date: any): string { //receive a NgbDateStruct
       //return a string
       return  date?date.day+'/'+date.month+'/'+date.year : '';
   }
}