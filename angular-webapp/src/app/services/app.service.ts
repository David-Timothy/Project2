import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
// this is where we can write our functions to interact with our back-end
export class AppService {

    constructor(private http:HttpClient) { }

}