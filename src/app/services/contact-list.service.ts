import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Logger } from 'angular2-logger/core';
import 'rxjs/add/operator/map';

import { Contact } from '../model/contact.model';

@Injectable()
export class ContactListService {
    contactList: Observable<Contact[]>
    private _contactList: BehaviorSubject<Contact[]>;
    dataStore: {
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
            {
                label: 'M1',
                time: 2200,
                brg: 67,
                rng: 10.8
            },
            {
                label: 'M2',
                time: 2208,
                brg: 63,
                rng: 9.4
            },
            {
                label: 'M3',
                time: 2216,
                brg: 58,
                rng: 8.2
            },
            {
                label: 'M4',
                time: 2224,
                brg: 52,
                rng: 7.2
            },
            {
                label: 'M5',
                time: 2232,
                brg: 43,
                rng: 6.2
            }
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
