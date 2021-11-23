
export class Filters {

    private type:string
    private minimumAmount:number;
    private maximumAmount:number;
    private since:string;
    private until:string;
    private concept:string;
    private user:string;

    constructor() {
        this.type = '';
        this.minimumAmount = 0;
        this.maximumAmount = 999999999;
        this.since = '';
        this.until = '';
        this.concept = '';
        this.user = ''
    }

    //Getters
    getType():string {
        return this.type;
    }
    getMinimumAmount():number {
        return this.minimumAmount;
    }
    getMaximumAmount():number {
        return this.maximumAmount;
    }
    getSince():any {
        return this.since;
    }

    getUntil():any {
        return this.until;
    }

    getConcept():string {
        return this.concept;
    }
    getUser():string {
        return this.user;
    }
    //Setter
    setType(type:string):void {
        this.type = type;
    }
    setMinumumAmount(minimumAmount:number):void {
        this.minimumAmount = minimumAmount;
    }
    setMaximumAmount(maximumAmount:number):void {
        this.maximumAmount = maximumAmount;
    }
    setSince(date:Date):void {
        if (date instanceof Date) {
            this.since = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
        } else {
            this.since = '';
        }
    
    }
    setUntil(date:Date):void {
        if (date instanceof Date) {
            this.until = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
        } else {
            this.since = '';
        }
    }
    setConcept(concept:string):void {
        this.concept = concept;
    }
    setUser(user:string):void {
        this.user = user;
    }
}