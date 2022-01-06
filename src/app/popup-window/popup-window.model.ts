export class PopUpWindow {

    title:string;
    body:string;
    confirmMethod:any;

    constructor(title:string,body:string, confirmMethod:any) {
        this.title = title;
        this.body = body;
        this.confirmMethod = confirmMethod;
    }

    printWindow() {

        const html = 
        `
        <div class="pop-up">
            <div class="title">`+this.title+`</div>
            <div class="body">`+this.body+`</div>
            <button>Confirmar</button>
            <button onclick="`+this.cancel+`">Cancelar</button>
        </div>
        `;

        const popup = document.createElement('div');
        popup.classList.add('pop-up-container');
        popup.innerHTML = html;
        document.body.insertBefore(popup,null);

        popup.addEventListener("click", () => {this.cancel()}, false);
        (<HTMLDivElement>document.querySelector('div.pop-up'))
        .addEventListener("click", (event) => {event.stopPropagation()}, false);
        //onclick de los botones
        (<HTMLButtonElement>document.querySelector('div.pop-up>button:first-of-type'))
        .addEventListener("click", () => {this.confirmMethod()}, false);
        (<HTMLButtonElement>document.querySelector('div.pop-up>button:last-of-type'))
        .addEventListener("click", () => {this.cancel()}, false);

    }

    cancel() {
        const popup = (<HTMLDivElement>document.querySelector('div.pop-up-container')); 
        popup.parentNode?.removeChild(popup);
    }

}