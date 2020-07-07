import { Model } from "./model";
import { DocumentType } from './document-type';


export class Document extends Model{

  public  idDocument: number;
  public  documentoPath: string;
  public  name: string;
  public  data: string;
  public  mimeType: string;
  public  documentType: DocumentType;
  public  srcImg:string;

  public spanLabel:string;
  public pComent:string;


  constructor(documentType?:DocumentType, spanLabel?:string){
    super();

    this.documentType = documentType;
    this.spanLabel = spanLabel;


  }

}