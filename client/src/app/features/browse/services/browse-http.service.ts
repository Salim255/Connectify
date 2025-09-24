import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PotentialMatch } from "../model/browse.model";

export type PotentialMatchesResponse = {
  status: 'Success';
  data: {
    matches: PotentialMatch []
  }
}

export type InitiateMatchDto = {
  toUserId: string;
}

@Injectable({providedIn: 'root'})
export class BrowseHttpService {
  private ENV = environment;
  private baseUrl: string = `${this.ENV.apiUrl}/matches`;

  constructor(private http: HttpClient){}

  fetchPotentialMatches():Observable<PotentialMatchesResponse>{
    return this.http.get<PotentialMatchesResponse>(`${this.baseUrl}/users/potential-matches`);
  }

  createMatch(matchPayload: InitiateMatchDto): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}`, matchPayload)
  }

  acceptMatch(matchId: string):Observable<any>{
    return this.http.patch<any>(`${this.baseUrl}${matchId}`, {})
  }
}
