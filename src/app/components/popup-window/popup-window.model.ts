export class PopUpWindow {

    title:string;
    body:string;
    confirmMethod:any;
    cancelButton:boolean;

    constructor(title:string,body:string = '', confirmMethod:any = undefined, cancelButton = true) {
        this.title = title;
        this.body = body;
        this.confirmMethod = confirmMethod;
        this.cancelButton = cancelButton;
    }

    printWindow() {

        const html = 
        `
        <div class="pop-up">
            <div class="title">`+this.title+`</div>
            <div class="body">`+this.body+`</div>
            <button>Confirmar</button>
            `+(this.cancelButton?`<button>Cancelar</button>`:``)+`
        </div>
        `;

        const popup = document.createElement('div');
        popup.classList.add('pop-up-container');
        popup.innerHTML = html;
        document.body.insertBefore(popup,null);

        document.addEventListener("keydown", (event) => {this.keyListener(event)});
        popup.addEventListener("click", () => {this.cancel()}, false);
        (<HTMLDivElement>document.querySelector('div.pop-up'))
        .addEventListener("click", (event) => {event.stopPropagation()}, false);
        //onclick de los botones
        (<HTMLButtonElement>document.querySelector('div.pop-up>button:first-of-type'))
        .addEventListener("click", () => {this.confirmMethod(); this.cancel()}, false);

        if (this.cancelButton) {
            (<HTMLButtonElement>document.querySelector('div.pop-up>button:last-of-type'))
            .addEventListener("click", () => {this.cancel()}, false);
        }


    }

    cancel() {
        const popup = (<HTMLDivElement>document.querySelector('div.pop-up-container')); 
        document.removeEventListener("keydown", (event) => {this.keyListener(event)});
        popup.parentNode?.removeChild(popup);
    }

    keyListener(event:KeyboardEvent) {
        //Si se pulsa Esc se cierra el pop up
        if (event.key == 'Escape') this.cancel();

    }

}