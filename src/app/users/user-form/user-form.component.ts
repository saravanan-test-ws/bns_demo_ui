import { Component, OnInit } from '@angular/core';
// ...existing code...
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  user: User = new User();
  isEdit = false;
  confirmPassword: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.userService.getUser(+id).subscribe(u => this.user = new User(u));
    }
  }


  get passwordMismatch(): boolean {
    return !this.isEdit && this.user.password !== this.confirmPassword;
  }

  formValid(): boolean {
    if (!this.isEdit && this.passwordMismatch) return false;
    // For edit, password is not required
    return !!this.user.firstName && !!this.user.lastName && !!this.user.emailId && (!!this.user.password || this.isEdit) && !!this.user.role;
  }

  save() {
    if (!this.formValid()) return;
    if (this.isEdit) {
      this.userService.updateUser(this.user.userId!, this.user).subscribe(() => this.router.navigate(['/users']));
    } else {
      this.userService.addUser(this.user).subscribe(() => this.router.navigate(['/users']));
    }
  }
}