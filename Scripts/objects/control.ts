/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        public rotationSpeed:number;
        public goDown: boolean;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(rotationSpeed:number, goDown:boolean) {
           this.rotationSpeed = rotationSpeed;
           this.goDown = goDown;
        }
        
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
       public switchButton() 
       {
           this.goDown = this.goDown ? false : true;  
            console.log(this.goDown); 

       }
    }
}
