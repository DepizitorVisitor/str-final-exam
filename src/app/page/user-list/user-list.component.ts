import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$: Observable<User[]> = this.userService.userList$;

  deletedItem: User = new User;

  filterPhrase: string = ''
  fKey = 'name';
  sort: string = 'id';

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getAll();
    this.users$.subscribe();
  }

  setDelete(user: User): void {
    this.deletedItem = user;
  }

  deleteItem(): void {
    this.userService.remove(this.deletedItem).subscribe(
      () => {
        this.userService.getAll();
      }
    );
  }

  sorter(param: string): void {
    this.sort = param;
  }

}
