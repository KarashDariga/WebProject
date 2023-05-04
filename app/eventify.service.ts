import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Category, Events, Token, LoginData, Company} from "./models";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EventifyService {
    httpOptions = {};
    BASE_URL = "http://127.0.0.1:8000/api";

    constructor(private client: HttpClient) {
        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            credentials: true
        };
    }

    getEvents(): Observable<Events[]> {
        return this.client.get<Events[]>(`${this.BASE_URL}/events/`);
    }

    getEvent(event_id: number): Observable<Events> {
        return this.client.get<Events>(`${this.BASE_URL}/events/${event_id}/`);
    }

    deleteEvent(event_id: number): Observable<Events> {
        return this.client.delete<Events>(`${this.BASE_URL}/events/${event_id}/`);
    }

    updateEvent(event_id: number): Observable<Events> {
        return this.client.delete<Events>(`${this.BASE_URL}/events/${event_id}/`);
    }

    getCategories(): Observable<Category[]> {
        return this.client.get<Category[]>(`${this.BASE_URL}/categories/`);
    }

    getCategory(id: number): Observable<Events[]> {

        return this.client.get<Events[]>(`${this.BASE_URL}/category/${id}/`);
    }

    getFavorites(): Observable<Events[]> {
        return this.client.get<Events[]>(`${this.BASE_URL}/favorites`);
    }

    getCompanies(): Observable<Company[]> {
        return this.client.get<Company[]>(`${this.BASE_URL}/companies/`);
    }

    getToken(login: LoginData): Observable<Token> {
        const logUrl = 'http://127.0.0.1:8000/profile/login/'
        return this.client.post<Token>(logUrl, login);
    }

    createEvent(formData: Events, params: HttpParams = new HttpParams()): Observable<Events>{
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.client.post<Events>(`${this.BASE_URL}/events/`, formData, {params, headers: headers});
    }
}
