import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/userModels';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from '../../../core/services/users.service';
import { Router } from '@angular/router';
import { UsersFormComponent } from './users-form/users-form.component';
import { UserFullNamePipe } from '../../../common/pipes/user-full-name.pipe';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  users$: Observable<User[]> = of([]);
  displayedColumns = [
    { columnDef: 'id', header: 'ID', cell: (row: any) => row.id },
    { columnDef: 'fullName', header: 'Nombre', cell: (row: any) => row, pipe: new UserFullNamePipe(), },
    { columnDef: 'userName', header: 'Email', cell: (row: any) => row.userName },
    { columnDef: 'profile', header: 'DNI', cell: (row: any) => row.profile },
  ];
  actionFunctions = [
    { label: 'edit', function: (user: User) => this.openForm(user)},
    { label: 'delete', function: (user: any) => this.onDelete(user.id)} 
  ];

  isLoading = false;

  constructor(
      private dialog: MatDialog,
      private usersService: UsersService,
      private router: Router
    ){}

    ngOnInit(): void {
      this.loadUsers();
    }

    loadUsers():void{
      this.isLoading = true;
      this.users$ = this.usersService.getUsers();
      this.users$.subscribe({
        next: () => {
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }

  onDelete(id: string) {
    if (confirm('Esta seguro?')) {
      this.usersService.removeUserById(id).subscribe({
        next: (users) => {
        },
        error: (err) => {
          this.loadUsers();
        },
        complete: () => {
          this.loadUsers();
        },
      });
    }
  }

  openForm(editingUser?: User): void {
    this.dialog
      .open(UsersFormComponent, {
        data: {
          editingUser,
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            this.isLoading = true;
            if (editingUser) {
              this.usersService.updateUserById(editingUser.id, result).subscribe({
                next: (users) => {
                },
                error: (err) => {
                  this.loadUsers();
                },
                complete: () => {
                  this.loadUsers();
                },
              });
            } else {
              this.usersService.createUser(result).subscribe({
                next: (users) => {
                },
                error: (err) => {
                  this.loadUsers();
                },
                complete: () => {
                  this.loadUsers();
                },
              });
            }
          }
        }
      });
  }
}
