import {bootstrap} from "@angular/platform-browser-dynamic";
import {Component} from "@angular/core";

class Article {
    votes: number;
    title: string;
    link: string;

    constructor(title: string, link: string, votes?: number) {
        this.title = title;
        this.link = link;
        this.votes = votes || 0;
    }

    voteUp() : boolean {
        this.votes += 1;
        return false;
    }

    voteDown() : boolean {
        this.votes -= 1;
        return false;
    }

    getDomain() : string {
        try {
            const link : string = this.link.split("//")[1];
            return link.split("/")[0];
        } catch (ex) {
            return null;
        }
    }
}

@Component({
    selector: "reddit-article",
    host: {
        class: "row"
    },
    template: `
        <div class="four wide column center aligned votes">
            <div class="ui statistic">
                <div class="value">
                    {{article.votes}}
                </div>
                <div class="label">
                    Points
                </div>
            </div>
        </div>
        <div class="twelve wide column">
            <a class="ui large header" href="{{article.link}}">
                {{article.title}}
            </a>
            <div class="meta">({{article.getDomain()}})</div>
            <ul class="ui big horizontal list voters">
                <li class="item">
                    <a href (click)="voteUp()">
                        <i class="arrow up icon"></i>
                        upvote
                    </a>
                </li>
                <li class="item">
                    <a href (click)="voteDown()">
                        <i class="arrow down icon"></i>
                        downvote
                    </a>
                </li>
            </ul>
        </div>
    `,
    inputs: ["article"]
})

class ArticleComponent {
    article: Article;

    voteUp() : boolean {
        this.article.voteUp();
        return false;
    }

    voteDown() : boolean {
        this.article.voteDown();
        return false;
    }
}

@Component({
    selector: "reddit",
    directives: [ArticleComponent],
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

        <div class="ui grid posts">
            <reddit-article
                *ngFor="let eachArticle of articles"
                [article]="eachArticle">
            </reddit-article>
        </div>
    `
})

class RedditApp {
    articles: Article[];

    constructor() {
        this.articles = [
            new Article("Angular 2", "http://angular.io", 5),
            new Article("Fullstack", "http://fullstack.io", 3),
            new Article("Angular Homepage", "http://angular.io", 9)
        ];
    }

    addArticle(newTitle: HTMLInputElement, newLink: HTMLInputElement) : void {
        this.articles.push(new Article(
            newTitle.value, newLink.value
        ));
        newTitle.value = "";
        newLink.value = "";
    }
}

bootstrap(RedditApp);