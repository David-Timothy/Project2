import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Request } from '../request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
 

  constructor(private http:HttpClient) { }


  buyCoins(request:Partial<Request>) {
    return this.http.post<Request>('http://localhost:9001/requests', request);
  }

  getAllPurchases(id:number) {
  return this.http.get<Request[]>(`http://localhost:9001/requests/${id}`);
  }

  requestRefund(request:Request) {
    return this.http.put<Request>(`http://localhost:9001/requests/refund/${request.id}`, request);
  }

  getAllPendingRequests() {
    return this.http.get<Request[]>('http://localhost:9001/requests/admin/status?status=pending');
  }

  getAllRequestedRefunds() {
    return this.http.get<Request[]>('http://localhost:9001/requests/admin/status?status=refund requested');
  }

  assignCoins(request:Request) {
    return this.http.put<Request>(`http://localhost:9001/requests/admin/assign/${request.id}`, request);
  }

  handleRequest(request:Request, status:string) {
    const params = new HttpParams()
    .set('status', status);
    return this.http.put<Request>(`http://localhost:9001/requests/admin/refund/${request.id}`, request, {params});
  }

}
