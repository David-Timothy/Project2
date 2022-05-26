// interface can be accessed throughout our PromiseRejectionEvent, contains the type of our object

export interface Account {
    // question mark makes this attribute optional
    // id?: Number;
    id:Number;
    username:String;
    password:String;
    email:String;
    account_type:String;
    created_at:String;
}