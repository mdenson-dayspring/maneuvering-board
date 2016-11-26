import {
  AfterViewInit,
  Component,
  Directive,
  ElementRef,
  Input,
  Renderer,
  ViewChild
} from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { Observable } from 'rxjs/observable';

import { Contact } from './model/contact.model';
import { ContactListService } from './services/contact-list.service';

declare var elementResizeDetectorMaker: Function;

@Component({
  selector: 'graphical-board',
  template: require('./graphical-board.component.html')
})
export class GraphicalBoardDirective implements AfterViewInit {
  @ViewChild('container') containerRef: ElementRef;
  @ViewChild('board') canvasRef: ElementRef;
  @Input() size: number;

  private listenFunc: Function;
  private canvas: any;
  private contactList: Contact[];
  contactList$: Observable<Contact[]>;

  constructor(private $contactList: ContactListService, private $log: Logger) { }

  ngOnInit() {
    this.contactList$ = this.$contactList.contactList;
    this.contactList = [];

    this.contactList$.subscribe(updatedContacts => {
      this.contactList = updatedContacts;
      
      if (this.canvas) {
        this.contactList.forEach((c) => this.drawContact(c));
      }
    });
  }

  ngAfterViewInit() {
    this.canvas = this.canvasRef.nativeElement;
    let erd = elementResizeDetectorMaker({
      strategy: "scroll"
    });
    erd.listenTo(this.containerRef.nativeElement, (element: any) => {
      let size: number = element.offsetWidth;
      this.canvas.width = +size;
      this.canvas.height = +size;

      this.drawGrid();
      this.contactList.forEach((c) => this.drawContact(c));
    });
  }

  private drawContact(m: Contact) {
    if (this.canvas.getContext) {
      let size: number = Math.min(this.canvas.height, this.canvas.width);

      let ctr: number = size / 2;
      let unit: number = (size - 22) / 20;
      let tenth: number = (size - 22) / 200;

      let ctx = this.canvas.getContext('2d');

      ctx.strokeStyle = 'black';
      ctx.fillStyle = 'black';
      ctx.lineWidth = 1;

      ctx.translate(ctr, ctr);
      ctx.rotate(m.brg * Math.PI / 180);
      ctx.translate(0, -unit * m.rng);

      ctx.beginPath();

      ctx.moveTo(-tenth, 0);
      ctx.lineTo(+tenth, 0);
      ctx.moveTo(0, -tenth);
      ctx.lineTo(0, +tenth);

      ctx.rotate(-m.brg * Math.PI / 180);
      ctx.font = '6pt Arial';
      var metrics = ctx.measureText(m.label);
      ctx.fillText(m.label, -metrics.width, -4);

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.stroke();
    }
  }

  private drawGrid() {
    if (this.canvas.getContext) {
      let size: number = Math.min(this.canvas.height, this.canvas.width);

      let ctr: number = size / 2;
      let unit: number = (size - 22) / 20;
      let tenth: number = (size - 22) / 200;

      let ctx = this.canvas.getContext('2d');

      ctx.strokeStyle = '#59714f';
      ctx.fillStyle = '#59714f';

      ctx.lineWidth = 1;

      ctx.translate(ctr, ctr);

      // center hash mark
      ctx.beginPath();
      ctx.moveTo(0 - (2 * tenth), 0);
      ctx.lineTo(0 + (2 * tenth), 0);
      ctx.moveTo(0, 0 - (2 * tenth));
      ctx.lineTo(0, 0 + (2 * tenth));
      ctx.stroke();

      // 1 - 9 mile dotted rings
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let d = 0; d < 360; d = d + 10) {
        ctx.rotate(10 * Math.PI / 180);

        for (let i = 1; i < 15; i++) {
          ctx.moveTo(0, (i * -unit) - 1);
          ctx.lineTo(0, (i * -unit) + 1);
        }

      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.stroke();

      // bearing labels
      ctx.translate(ctr, ctr);
      for (let d = 0; d < 360; d = d + 10) {
        // Bearing labels
        ctx.font = '9pt Arial';
        let metrics = ctx.measureText(d);
        ctx.fillText(d, -metrics.width / 2, -10 * unit - 2);
        // Reciprocal bearing labels
        ctx.font = '6pt Arial';
        let recip = d >= 180 ? d - 180 : 360 + (d - 180);
        metrics = ctx.measureText(recip);
        ctx.fillText(recip, -metrics.width / 2, -10 * unit + 8);

        ctx.rotate(10 * Math.PI / 180);
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      // borders
      ctx.lineWidth = 1;
      ctx.translate(ctr, ctr);
      ctx.beginPath();
      let tenmmiles = 10 * unit;
      // outside circle (10 mile)
      ctx.arc(0, 0, tenmmiles, 0, Math.PI * 2, true);
      ctx.stroke();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
  }
}