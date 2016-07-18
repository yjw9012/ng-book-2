import {bootstrap} from "@angular/platform-browser-dynamic";
import {Component} from "@angular/core";

@Component({
    selector: "reddit",
    template: `
        <form class="ui large form segment">
            <h3 class="ui header">Add a Link</h3>
            <div class="field">
                <label for="title">Title:</label>
                <input name="title" #newTitle>
            </div>
            <div class="field">
                <label for="link">Link:</label>
                <input name="link" #newLink>
            </div>
            <button (click)="addArticle(newTitle, newLink)"
                    class="ui positive right floated button">
                Submit
            </button>
        </form>
    `
})

class RedditApp {

    constructor() {
    }

    addArticle(newTitle: HTMLInputElement, newLink: HTMLInputElement) : void {
        console.log(`Adding article: newTitle="${newTitle.value}" / newLink="${newLink.value}"`);
    }
}

bootstrap(RedditApp);