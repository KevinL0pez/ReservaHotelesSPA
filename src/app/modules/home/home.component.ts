import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ISafeAny } from '@sharedModule/models/ISafeAny';
import { ErrorHandlerService } from '@sharedModule/service/errorHandler.service';
import { UtilitiesService } from '@sharedModule/service/utilitiesSevice.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public formExample: FormGroup;

  constructor(
    private spinner: NgxSpinnerService, 
    private modalService: NgbModal,
    public utilitiesService: UtilitiesService,
    private formBuilder: FormBuilder,
    public readonly errorHandlerService: ErrorHandlerService
  ) { 
    this.formExample = this.formBuilder.group({
      myControlName: new FormControl('', [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(15),
        Validators.email
      ]
      )
    })
  }

  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }

  public open(modal: ISafeAny): void {
    this.modalService.open(modal);
  }

  get myControlName() {
    return this.formExample.controls['myControlName'];
  }

}
