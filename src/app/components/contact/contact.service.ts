import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { MessagesModel } from '../../../models/message.model';

@Injectable({
    providedIn: 'root',
})
export class ContactService {
    private readonly http = inject(HttpClient);


    private readonly baseUrl: string =
        'https://portfolio-server-ybmt.onrender.com/api';

    saveMessage(msg: MessagesModel) {
        return this.http.post(this.baseUrl, msg);
    }
}
