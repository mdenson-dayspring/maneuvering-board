import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Logger } from 'angular2-logger/core';
import 'rxjs/add/operator/map';

import { Contact } from '../model/contact.model';

@Injectable()
export class ContactListService {
    contactList: Observable<Contact[]>;
    private _contactList: BehaviorSubject<Contact[]>;
    private dataStore: {
        contactList: Contact[]
    };

    constructor(private $log: Logger) {
        this.dataStore = { contactList: [] };
        this._contactList = <BehaviorSubject<Contact[]>>new BehaviorSubject([]);
        this.contactList = this._contactList.asObservable();

        this.loadAll();
    }

    loadAll() {
        this.dataStore.contactList = [
            new Contact(
                'M1',
                2200,
                67,
                10.8
            ),
            new Contact(
                'M2',
                2208,
                63,
                9.4
            ),
            new Contact(
                'M3',
                2216,
                58,
                8.2
            ),
            new Contact(
                'M4',
                2224,
                52,
                7.2
            ),
            new Contact(
                'M5',
                2232,
                43,
                6.2
            ),
            new Contact(
                '6.2@100T',
                2232,
                100,
                6.2
            ),
            new Contact(
                '6.2@170T',
                2232,
                170,
                6.2
            ),
            new Contact(
                '3.2@180T',
                2232,
                180,
                3.2
            ),
            new Contact(
                '9.2@190T',
                2232,
                190,
                9.2
            ),
            new Contact(
                '5.2@250T',
                2232,
                250,
                5.2
            ),
            new Contact(
                '2@270T',
                2232,
                270,
                2
            ),
            new Contact(
                '8.2@280T',
                2232,
                280,
                8.2
            ),
            new Contact(
                '4@350T',
                2232,
                350,
                4
            )
        ];
        this._contactList.next(Object.assign({}, this.dataStore).contactList);
    }

    create(contact: Contact) {
        this.dataStore.contactList.push(contact);
        this._contactList.next(Object.assign({}, this.dataStore).contactList);
    }

    update(contact: Contact) {
        this.dataStore.contactList.forEach((c, i) => {
            if (c.time === contact.time) { this.dataStore.contactList[i] = contact; }
        });

        this._contactList.next(Object.assign({}, this.dataStore).contactList);
    }

    remove(time: number) {
        this.dataStore.contactList.forEach((c, i) => {
            if (c.time === time) { this.dataStore.contactList.splice(i, 1); }
        });

        this._contactList.next(Object.assign({}, this.dataStore).contactList);
    }
}
