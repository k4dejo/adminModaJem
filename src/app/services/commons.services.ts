import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
    providedIn: 'root'
})
export class CommonServices {
    client: Client;
    private sendClientSubject = new Subject<Client>();
    public sendClientObservables = this.sendClientSubject.asObservable();

    sendOneClient(client: Client) {
        this.client = client;
        this.sendClientSubject.next(client);
    }
}