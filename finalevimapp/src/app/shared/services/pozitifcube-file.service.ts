import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})

export class PozitifcubeFileService {

  basePngDefault = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8f/91PQAIeAMqKVLNHwAAAABJRU5ErkJggg==';
  /* fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx'; */
  

  constructor() { }

  public exportAsExcelFile(rows: any[], excelFileName: string): void {
    if (rows.length > 0) {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(rows);
      const workbook: XLSX.WorkBook = {Sheets: {'Compte-rendu': worksheet}, SheetNames: ['Compte-rendu']};
      const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
      this.saveAsExcelFile(excelBuffer, excelFileName);
    }else{
      // this.notifService.message('Aucune ligne à exporter...');
    }
  }
  private saveAsExcelFile(buffer: any, baseFileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, baseFileName + '_' + this.getDateFormat(new Date())  + EXCEL_EXTENSION);
  }

  private getDateFormat(date: Date): string {
    return  'exporteddata';//formatDate(date, 'yyyyMMdd_HHmmss', 'en-US');
  }

  /* public exportExcel( dataSource: any , fileName: string): void {

    if ( Array.isArray( dataSource ) ) {
      var ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataSource);
    }else{
      var element = document.getElementById(dataSource);
      var ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    }

    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: this.fileType});
    FileSaver.saveAs(data, fileName + this.fileExtension);
  } */
  

  imageFixedSize( reader , mimeType , width , height , quality ){

    return Observable.create(function (observer) {
      var img = document.createElement("img");
      var image = new Image(); image.src = reader.result;
      image.onload = function(){
          img.src = reader.result;
          var canvas = document.createElement("canvas") , ctx = canvas.getContext("2d"); ctx.drawImage(img, 0, 0);
          canvas.width = width; canvas.height = height;
          var ctx = canvas.getContext("2d"); ctx.drawImage(img, 0, 0, width, height);
          observer.next( canvas.toDataURL(mimeType , quality) ); observer.complete();
      }
      image.onerror = function(){ observer.next(false); observer.complete(); };
    });

  }

  imageResize( reader , mimeType , maxWidth , maxHeight , quality){

    return Observable.create(function (observer) {
      var img = document.createElement("img");
      var image = new Image(); image.src = reader.result;
      image.onload = function(){
          img.src = reader.result;
          var canvas = document.createElement("canvas") , ctx = canvas.getContext("2d"); ctx.drawImage(img, 0, 0);
          var width = img.width, height = img.height;
          if (width > height) { if (width > maxWidth) { height *= maxWidth / width; width = maxWidth; } }
          else { if (height > maxHeight) { width *= maxHeight / height; height = maxHeight; } }
          canvas.width = width; canvas.height = height;
          var ctx = canvas.getContext("2d"); ctx.drawImage(img, 0, 0, width, height);
          observer.next( canvas.toDataURL(mimeType, quality) ); observer.complete();
      }
      image.onerror = function(){ observer.next(false); observer.complete(); };
    });

  }

}
