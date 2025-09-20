import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class BrowseHttpService {
    private ENV = environment;
    private baseUrl: string = ``;
}
