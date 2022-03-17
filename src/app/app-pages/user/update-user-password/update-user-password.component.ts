import {Component, OnInit} from '@angular/core';
import {User} from "../../../model/employee/EmployesResponse";
import {NgForm} from "@angular/forms";
import {ModalService} from "../../../shared/_services";
import {ToastsManager} from "ng2-toastr";
import {ApiService} from "../../../service/api-service";

@Component({
  selector: 'app-update-user-password',
  templateUrl: './update-user-password.component.html',
  styleUrls: ['./update-user-password.component.scss']
})
export class UpdateUserPasswordComponent implements OnInit {

  public user: User;
  newPassword = '';
  submitForm = false;

  constructor(private modalService: ModalService, private toastService: ToastsManager,
              private apiService: ApiService) {
  }

  ngOnInit() {

  }


  public setUser(user: User) {
    this.user = user;
  }


  updatePassword(form: NgForm) {
    this.submitForm = true;
    if (!form.valid) {
      return;
    }

    this.apiService.updateUserPassword(this.user.user.Id, this.newPassword)
      .subscribe(response => {
        //TODO localize this
        this.toastService.success("تم تحديث كلمة المرور");
        this.closeModal();
      }, error1 => {
        this.toastService.error(error1.error_user_message);
      });

  }


  public showModel() {
    this.modalService.open("passwordModal");
  }


  closeModal() {
    this.modalService.close("passwordModal");

  }
}
