/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { ListModel } from './list.model';
import { courseList } from './data';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from './list-sortable.directive';
import {UserProfileService} from "../../../../core/services/user.service";

interface SearchResult {
  users: ListModel[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  ProductFilter: string;
  productStatus: string;
  productPrice: number;
  productRate: number;
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

function matches(user: ListModel, term: string, pipe: PipeTransform) {
  return user.first_name?.toLowerCase().includes(term.toLowerCase())
    || user.last_name?.toLowerCase().includes(term.toLowerCase())
    || user.phone_number?.toLowerCase().includes(term.toLowerCase())
    || user.email?.toLowerCase().includes(term.toLowerCase())
    || user.gender?.toLowerCase().includes(term.toLowerCase())
    || user.username?.toLowerCase().includes(term.toLowerCase())
    ;
}

@Injectable({ providedIn: 'root' })
export class ListServiceBuyer {
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
    productStatus: '',
    productRate: 0,
    productPrice: 0,
    sortColumn: '',
    sortDirection: '',
    startIndex: 0,
    endIndex: 10,
    totalRecords: 0
  };
  user = [];
  users: any | undefined;
  Products$: any;
  products$: any;
  constructor(
    private  userProfileService : UserProfileService,
    private pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._countries$.next(result.users);
      this._total$.next(result.total);
    });
    this._search$.next();

    this.retrieveUser()

   // this.products = courseList.reverse();
  }

  retrieveUser(): void {
    this.userProfileService.getDataBuyer()
      .subscribe({
        next: (data: ListModel[]) => {
          this.users = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  get countries$() { return this._countries$.asObservable(); }
  get userList() { return this.users; }
  get total$() { return this._total$.asObservable(); }
  get datas$() { return this._datas$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }
  get ProductFilter() { return this._state.ProductFilter; }
  get productPrice() { return this._state.productPrice; }
  get productRate() { return this._state.productRate; }
  get productStatus() { return this._state.productStatus; }
  get startIndex() { return this._state.startIndex; }
  get endIndex() { return this._state.endIndex; }
  get totalRecords() { return this._state.totalRecords; }

  set page(page: number) { this._set({ page }); }
  set pageSize(pageSize: number) { this._set({ pageSize }); }
  set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
  set ProductFilter(ProductFilter: string) { this._set({ ProductFilter }); }
  set productPrice(productPrice: number) { this._set({ productPrice }); }
  set productStatus(productStatus: string) { this._set({ productStatus }); }
  set productRate(productRate: number) { this._set({ productRate }); }
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

    const datas = (this.userList) ?? [];
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // 1. sort
    let users = sort(datas, sortColumn, sortDirection);

    // 2. search
    if (searchTerm) {
      users = users.filter(user => matches(user, searchTerm, this.pipe));
    }

    // 3. filter
    if (this.ProductFilter) {
      users = users.filter(user => matches(user, this.ProductFilter, this.pipe));
    }

    // 4. paginate
    this.totalRecords = users.length;
    this._state.startIndex = (page - 1) * this.pageSize + 1;
    this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }

    // 5. Rate Filter
    if (this.productRate) {
      users = users.filter(user => user.username >= this.productRate);
    }
    else {
      users = users;
    }

    // 6 Status Filter
    if (this.productStatus) {
      users = users.filter(user => user.is_active == this.productStatus);
    }
    else {
      users = users;
    }

    const total = users.length;

    users = users.slice(this._state.startIndex - 1, this._state.endIndex);
    return of({ users, total });

  }
}