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
                1100,
                255,
                10
            ),
            new Contact(
                'M2',
                1107,
                260,
                7.85
            ),
            new Contact(
                'M3',
                1114,
                270,
                5.6
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
