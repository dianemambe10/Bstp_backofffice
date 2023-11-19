import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Buyer} from "../models/buyer.model";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data$ = new BehaviorSubject<any>({});
  selectedData$ = this.data$.asObservable();

  private dataUser$ = new BehaviorSubject<any>({});
  selectedDataUser$ = this.dataUser$.asObservable();


  private dataEntreprise$ = new BehaviorSubject<any>({});
  selectedDataEntreprise$ = this.dataEntreprise$.asObservable();


  private dataBuyer$ = new BehaviorSubject<any>({});
  selectedDataBuyer$ = this.dataBuyer$.asObservable();



  private dataList$ = new BehaviorSubject<any>([]);
  selectedDataList$ = this.data$.asObservable();

  private dataPrefetureList$ = new BehaviorSubject<any>([]);
  selectedDataPrefectureList$ = this.dataPrefetureList$.asObservable();


  private dataRegionList$ = new BehaviorSubject<any>([]);
  selectedDataRegionList$ = this.dataRegionList$.asObservable();


  private dataCommuneList$ = new BehaviorSubject<any>([]);
  selectedDataCommuneList$ = this.dataCommuneList$.asObservable();


  private dataDomaineList$ = new BehaviorSubject<any>([]);
  selectedDataDomainList$ = this.dataDomaineList$.asObservable();


  private datatypeList$ = new BehaviorSubject<any>([]);
  selectedDatatypeList$ = this.datatypeList$.asObservable();


  private actionnaireList$ = new BehaviorSubject<any>([]);
  selectedActionnaireList$ = this.actionnaireList$.asObservable();


  setDataUser$(data: any) {
    this.dataUser$.next(data);
  }

  setDataEntreprise$(data: any) {
    this.dataEntreprise$.next(data);
  }

  setDataBuyer$(data: any) {
    this.dataBuyer$.next(data);
  }


  setData$(data: any) {
    this.data$.next(data);
  }


  setDataList$(datas: any) {
    this.data$.next(datas);
  }

  setDataPrefectureList$(datas: any) {
    this.dataPrefetureList$.next(datas);
  }

  setDataRegionList$(datas: any) {
    this.dataRegionList$.next(datas);
  }

  setDataCommuneList$(datas: any) {
    this.dataCommuneList$.next(datas);
  }

  setDataDomaineList$(datas: any) {
    this.dataDomaineList$.next(datas);
  }

  setDataTypeList$(datas: any) {
    this.datatypeList$.next(datas);
  }
  setActionnaireList$(datas: any) {
    this.actionnaireList$.next(datas);
  }

}
