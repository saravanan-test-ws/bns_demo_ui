import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  dataSource = new MatTableDataSource<User>([]);
  displayedColumns: string[] = ['firstName', 'lastName', 'emailId', 'role', 'actions'];
  totalCount = 0;
  page = 0;
  pageSize = 10;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.page, this.pageSize).subscribe(data => {
      this.dataSource.data = data.users;
      this.totalCount = data.totalCount;
    });
  }

  pageChange(event: any) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadUsers();
  }

  addUser() {
    this.router.navigate(['/users/add']);
  }

  editUser(user: User) {
    this.router.navigate(['/users/edit', user.userId]);
  }

  deleteUser(user: User) {
    const confirmDelete = confirm(`Delete user ${user.firstName} ${user.lastName}?`);
    if (confirmDelete) {
      this.userService.deleteUser(user.userId!).subscribe(() => this.loadUsers());
    }
  }
}