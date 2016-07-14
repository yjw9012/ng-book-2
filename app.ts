import {bootstrap} from "@angular/platform-browser-dynamic";
import {Component} from "@angular/core";

@Component({
    selector: "hello-world",
    template: `
        <div>
            Hello {{name}}!
        </div>
    `
})

class HelloWorld {
    name : string;

    constructor() {
        this.name = "Jiwoong";
    }
}

bootstrap(HelloWorld);