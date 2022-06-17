import { Component, OnInit } from '@angular/core';
import { iuser, iaddress, icurrencyuser } from 'src/app/interface/interfaces';
import { FormControl, FormGroup } from '@angular/forms';
import { userservice } from 'src/app/services/user.service';
import { currencyuserservice } from 'src/app/services/currencyuser.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = "login/signup";
  list : iuser[] = [];
  user : iuser = {} as iuser;
  userbyid : iuser[] = [];
  usercurrencies : icurrencyuser[] = [];

  userform = new FormGroup({
    userid: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    country: new FormControl(''),
    zipcode: new FormControl(''),
  });

  constructor(private webapi:userservice, private currencyuserapi:currencyuserservice) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.user = {userid : 0,
                    username : this.userform.controls["username"].value,
                    password : this.userform.controls["password"].value,
                    address : {
                      userid : 0,
                      country : this.userform.controls["country"].value,
                      zipcode : Number(this.userform.controls["zipcode"].value)
                    },
                    currencyuser : null
                  }

    this.createuser(this.user)

    localStorage.setItem("user", this.user.username);
  }

  update() {
    this.user = {userid : this.userform.controls["userid"].value,
      username : this.userform.controls["username"].value,
      password : this.userform.controls["password"].value,
      address : null,
      currencyuser : null}

      console.log(this.user)

      this.webapi.update(this.user).subscribe(updateduser => {
        alert("user updated")
      })
  }

  viewusers() {
    this.webapi.getall().subscribe((allusers)=>{
      console.log(allusers)
      this.list = allusers;
     })
  }

  deleteuser(userid:number){
    this.webapi.delete(userid).subscribe();
  }

  getuserbyid(userid: string) {
    this.userbyid = []
    this.webapi.gettables(Number(userid)).subscribe((user) => {
      this.userbyid.push(user[0])
    });
  }

  showcurrencies(userid: string)  {
    this.currencyuserapi.gettables(Number(userid)).subscribe(currencyuser => {
      console.log(currencyuser)
      this.usercurrencies = currencyuser
    })
  }

  createuser(userobject : iuser){
    this.webapi.post(userobject).subscribe(createduser =>{
      console.log(createduser)
      alert("User created")
    })
  }

}
