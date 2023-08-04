import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MessagesModel } from 'src/models/message.model';

@Injectable({
    providedIn: 'root',
})
export class ContactService {
    constructor(private readonly http: HttpClient) {}

    private readonly baseUrl: string =
        'https://portfolio-server-ybmt.onrender.com/api';

    saveMessage(msg: MessagesModel) {
        return this.http.post(this.baseUrl, msg);
    }
}
