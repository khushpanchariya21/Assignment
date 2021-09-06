import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent, Observable, of, Subscription } from 'rxjs';
import { catchError, debounceTime, delay, distinctUntilChanged, filter, first, map, tap } from 'rxjs/operators';
import { Movies, result } from 'src/app/models/movies';

import { Users } from '../../models/users';
import {  AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit,AfterViewInit {
    currentUser: Users;
    currentUserSubscription: Subscription;
    
   abc: Movies["results"]
   apiResponse: any;
  isSearching: boolean;
   @ViewChild('input', { static: true }) movieSearchInput: ElementRef;
    retry: boolean=false;
    asyncMeals: Observable<any>;
    p: number = 1;
    total: number;
    loading: boolean;
    public filter: string = '';
    modelitem: any;
    constructor(
        private authService: AuthService,
        private userService: DataService,
        private toastr : ToastrService,
        private modalService: NgbModal
    ) {
        this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
        this.isSearching = false;
        this.apiResponse = [];

        console.log(this.movieSearchInput);
    }

    ngOnInit() {
        this.loadAllMovies(1);
        // this.searchGetCall(this.filter)
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }
    ngAfterViewInit() {
        // server-side search
       fromEvent(this.movieSearchInput.nativeElement, 'keyup')
          .pipe(
            map((event: any) => {
                return event.target.value;
              }),
            debounceTime(250),
            filter(res=>res.length>3),
            
            distinctUntilChanged(),
            
          )
          .subscribe((text:string)=>{
            this.isSearching = true;
            console.log(text)
            if (text === '') {
                return this.asyncMeals
              }
              return this.asyncMeals=this.asyncMeals.pipe(map(items=>items.filter((x)=>x.title.toLowerCase().indexOf(text.toLowerCase())!==-1)))
            // this.searchGetCall(text).subscribe((res) => {
            // //  this.asyncMeals.pipe(map(x=>{x=res}))
            // console.log(res)
            //     this.isSearching = false;
            //     this.apiResponse = res;
            //   }, (err) => {
            //     this.isSearching = false;
            //     console.log('error', err);
            //   });
      
          });
        
      }
    
    searchGetCall(term: string) {
        console.log("terms",term)
        console.log(this.asyncMeals)
        if (term === '') {
          return of([])
        }
        return this.asyncMeals=this.asyncMeals.pipe(map(items=>items.filter((x)=>x.title.toLowerCase().indexOf(term.toLowerCase())!==-1)))
      } 
   loadAllMovies(page:number){
    this.loading = true;
    this.asyncMeals = this.userService.getAllMovies(page).pipe(
        tap(res => {
            this.total = res.count;
            this.p = page;
            this.loading = false;
            this.retry=false
        },err=>{this.toastr.error(err);this.retry=true}),
        
        map(res => res.results),
    );
        
    }
    
    openVerticallyCentered(content,item) {
        this.modalService.open(content, { centered: true,size:'md' });
        this.modelitem=item
        console.log(this.modelitem)
      }
}
