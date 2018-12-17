import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogs: any;

  title = 'Add Blog';
  angForm: FormGroup;

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    const token = localStorage.getItem('jwtToken');
    let httpOptions = {};
    if (token != null) {
      httpOptions = { headers : new HttpHeaders({ 'Authorization': token })};
    }
    this.http.get('/api/blog', httpOptions).subscribe(data => {
      this.blogs = data;
      console.log(this.blogs);
    }, err => {
      if (err.status === 401) {
        this.router.navigate(['login']);
      }
    });
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      name: ['', Validators.required ],
      price: ['', Validators.required ]
    });
  }

  addCoin(name, price) {
    console.log(name + ' : ' + price);
    const data = {
      isbn: '777',
      title: '777',
      author: '777',
      publisher: '777'
    };

    const token = localStorage.getItem('jwtToken');
    let httpOptions = {};
    if (token != null) {
      httpOptions = { headers : new HttpHeaders({ 'Authorization': token })};
    }
    this.http.post('/api/blog', data, httpOptions).subscribe(resp => {
      console.log(resp);
    }, err => {
      console.log(err);
    });
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['login']);
  }

}
