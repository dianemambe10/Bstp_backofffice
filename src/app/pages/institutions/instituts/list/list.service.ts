/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from './list-sortable.directive';
import { InstitutService } from 'src/app/core/services/institut.service';
import { ListModel } from './list.model';

interface SearchResult {
  countries: ListModel[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  ProductFilter: string;
  buyerStatus: string;
  buyerPrice: number;
  buyerRate: number;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  startIndex: number;
  endIndex: number;
  totalRecords: number;
}
const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
function sort(countries: ListModel[], column: SortColumn, direction: string): ListModel[] {
  if (direction === '' || column === '') {
    return countries;
  } else {
    return [...countries].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(country: ListModel, term: string, pipe: PipeTransform) {
  return country.name.toLowerCase().includes(term.toLowerCase())
    || country.email.toLowerCase().includes(term.toLowerCase())
    || country.phone_number.toLowerCase().includes(term.toLowerCase())
    || country.email.toLowerCase().includes(term.toLowerCase())
    || country.type?.name!.toLowerCase().includes(term.toLowerCase())
    || country.prefecture?.name!.toLowerCase().includes(term.toLowerCase())
    || country.region?.name!.toLowerCase().includes(term.toLowerCase())
    || country.commune?.name!.toLowerCase().includes(term.toLowerCase())
    ;
}
@Injectable({ providedIn: 'root' })
export class ListService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _countries$ = new BehaviorSubject<ListModel[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private _datas$ = new Subject<void>();
  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    ProductFilter: '',
    buyerStatus: '',
    buyerRate: 0,
    buyerPrice: 0,
    sortColumn: '',
    sortDirection: '',
    startIndex: 0,
    endIndex: 10,
    totalRecords: 0
  };
  user = [];
  buyers: any | undefined;
  buyers_back: any | undefined;
  Buyers$: any;
  buyers$: any;
  constructor(private pipe: DecimalPipe, private InstitutService: InstitutService) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._countries$.next(result.countries);
      this._total$.next(result.total);
    });
    this._search$.next();

   this.retrievebuyer()
  }


  retrievebuyer(): void {
    this.InstitutService.getData()
      .subscribe({
        next: (data) => {
          this.buyers = data;
          this.buyers_back = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  get countries$() { return this._countries$.asObservable(); }
  get buyer() { return this.buyers; }
  get total$() { return this._total$.asObservable(); }
  get datas$() { return this._datas$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }
  get ProductFilter() { return this._state.ProductFilter; }
  get buyerPrice() { return this._state.buyerPrice; }
  get buyerRate() { return this._state.buyerRate; }
  get buyerStatus() { return this._state.buyerStatus; }
  get startIndex() { return this._state.startIndex; }
  get endIndex() { return this._state.endIndex; }
  get totalRecords() { return this._state.totalRecords; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set ProductFilter(ProductFilter: string) { this._set({ ProductFilter }); }
  set buyerPrice(buyerPrice: number) { this._set({ buyerPrice }); }
  set buyerStatus(buyerStatus: string) { this._set({ buyerStatus }); }
  set buyerRate(buyerRate: number) { this._set({ buyerRate }); }
  set sortColumn(sortColumn: SortColumn) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }
  set startIndex(startIndex: number) { this._set({ startIndex }); }
  set endIndex(endIndex: number) { this._set({ endIndex }); }
  set totalRecords(totalRecords: number) { this._set({ totalRecords }); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {

    const datas = (this.buyer) ?? [];
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // 1. sort
    let countries = sort(datas, sortColumn, sortDirection);

    // 2. search
    if (searchTerm) {
      countries = countries.filter(country => matches(country, searchTerm, this.pipe));
    }

    // 3. filter
    if (this.ProductFilter) {
      countries = countries.filter(country => matches(country, this.ProductFilter, this.pipe));
    }

    // 4. paginate
    this.totalRecords = countries.length;
    this._state.startIndex = (page - 1) * this.pageSize + 1;
    this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }

    // 5. Rate Filter
    if (this.buyerRate) {
      countries = countries.filter(country => country.status >= this.buyerRate);
    }
    else {
      countries = countries;
    }

    // 6 Status Filter
    if (this.buyerStatus) {
      countries = countries.filter(country => country.status == this.buyerStatus);
    }
    else {
      countries = countries;
    }

    const total = countries.length;

    countries = countries.slice(this._state.startIndex - 1, this._state.endIndex);
    return of({ countries, total });

  }
}
