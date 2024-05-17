import { Component } from '@angular/core';
import {LoaderService} from "../../core/services/loader.service";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  loading!: boolean;

  constructor(private loaderService: LoaderService) {

    this.loaderService.isLoading.subscribe((v) => {
      //console.log(v);
      this.loading = v;
    });

  }
  ngOnInit() {
  }
}
