import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../post/models/Post";
import {User} from "../../user/models/User";
import {ActivatedRoute, Router} from "@angular/router";
import {UserAccountService} from "../services/user-account.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
posts: Post[];
  @Input()
  user: User;
  form: FormGroup;
  title: FormControl = new FormControl('')
  body: FormControl = new FormControl('', [Validators.required])
  image: FormControl = new FormControl('');
  constructor(private activatedRoute: ActivatedRoute, private userAccountService: UserAccountService, private router:Router) {
    this.form = new FormGroup({
      title: this.title,
      body: this.body,
      image: this.image
    })
  }
  onFileUpload(event: any) {
    const[file] = event.target.files;
    this.form.patchValue({image:file})
  }
  doPost(form: FormGroup): void{
    const formData = new FormData();
    Object.entries(form.value).forEach(([key,value]: any[])=> {
      if(key === 'image'){
        formData.set(key, form.get(key).value)
      }
      else {
        formData.set(key,value)
      }
    })
    this.userAccountService.doPost(formData).subscribe(value => console.log(value));
    document.location.reload();
  }
  ngOnInit(): void {
      this.userAccountService.getCurrentUser().subscribe(value => this.user = value);
      this.userAccountService.getCurrentUserPosts().subscribe(value => this.posts = value);
  }
  toPost(id: number) : void{
    this.router.navigate([`my_account/posts/${id}`]);
  }
}
