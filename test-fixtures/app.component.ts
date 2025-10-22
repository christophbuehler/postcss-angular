import { ChangeDetectionStrategy, Component } from "@angular/core";

// @ts-ignore
@Component({
  selector: "app-root",
  template: ``,
  styles: [
    `
      $lorem: 4px;
      :host {
        margin: 0 auto;
        margin: 0 auto;
      }

      div {
        display: block;
        display: block;
      }
    `,
    `
      :host {
        margin: 0 auto;
      }
    `,
    `
      :host {
        margin: 0 auto;
        margin: 0 auto;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent2 {}

// @ts-ignore
@Component({
  selector: "app-root",
  template: ``,
  styles: [
    `
      :host {
        margin: 0 auto;
        margin: 0 auto;
      }

      div {
        display: block;
        display: block;
      }
    `,
    `
      :host {
        margin: 0 auto;
      }
    `,
    `
      :host {
        margin: 0 auto;
        margin: 0 auto;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent3 {}


// @ts-ignore
@Component({
  selector: "app-root",
  template: ``,
  styles:
    `
      :host {
        margin: 0 auto;
        margin: 0 auto;
      }

      div {
        display: block;
        display: block;
      }

      :host {
        margin: 0 auto;
      }

      :host {
        margin: 0 auto;
        margin: 0 auto;
      }
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent4 {}
