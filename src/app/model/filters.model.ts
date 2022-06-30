
export class Filters {

    private type:string
    private minimumAmount:number;
    private maximumAmount:number;
    private since:any;
    private until:any;
    private concept:string;
    private user:string;

    constructor() {
        this.type = 'Todos';
        this.minimumAmount = 0;
        this.maximumAmount = 999999999;
        this.since = '';
        this.until = '';
        this.concept = '';
        this.user = ''
    }

    public clear() {
        this.type = 'Todos';
        this.minimumAmount = 0;
        this.maximumAmount = 999999999;
        this.since = '';
        this.until = '';
        this.concept = '';
        this.user = ''
    }

    //Getters
    public getType():string {
        return this.type;
    }
    public getMinimumAmount():number {
        return this.minimumAmount;
    }
    public getStringMinimumAmount():any {
        return this.minimumAmount==0 ? '' : this.minimumAmount;
    }
    public getMaximumAmount():number {
        return this.maximumAmount;
    }
    public getStringMaximumAmount():any {
        return this.maximumAmount==999999999 ? '' : this.maximumAmount;
    }
    public getSince():any {
        return this.since;
    }
    public getFormattedSince():any {
        if (!(this.since instanceof Date))
            return '';
        const day = (this.since.getDate() < 9) ? '0'+this.since.getDate() : this.since.getDate();
        const month = (this.since.getMonth() < 9) ? '0'+(this.since.getMonth()+1) : (this.since.getMonth()+1);
        const year = this.since.getFullYear();
        return  day+'/'+month+'/'+year;
    }

    public getUntil():any {
        return this.until;
    }

    public getFormattedUntil():any {
        if (!(this.until instanceof Date))
            return '';
        const day = (this.until.getDate() < 9) ? '0'+this.until.getDate() : this.until.getDate();
        const month = (this.until.getMonth() < 9) ? '0'+(this.until.getMonth()+1) : (this.until.getMonth()+1);
        const year = this.until.getFullYear();
        return  day+'/'+month+'/'+year;
    }

    public getConcept():string {
        return this.concept;
    }
    public getUser():string {
        return this.user;
    }
    //Setter
    public setType(type:string):void {
        this.type = type;
    }
    public setMinumumAmount(minimumAmount:number):void {
        this.minimumAmount = minimumAmount;
    }
    public setMaximumAmount(maximumAmount:number):void {
        this.maximumAmount = maximumAmount;
    }
    public setSince(date:Date):void {
        if (date instanceof Date) {
            this.since = date;
        } else {
            this.since = '';
        }
    
    }
    public setUntil(date:Date):void {
        if (date instanceof Date) {
            this.until = date;
        } else {
            this.until = '';
        }
    }
    public setConcept(concept:string):void {
        this.concept = concept;
    }
    public setUser(user:string):void {
        this.user = user;
    }
}