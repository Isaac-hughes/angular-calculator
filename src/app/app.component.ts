import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  display:string = '';
  operators:string[] = ['ADD', 'SUBTRACT', 'DIVIDE', 'MULTIPLY', 'UNDO', 'C', 'DECIMAL']
  currentSelection:string = '';

  events:string[] =[];

  pushToEvents = (item:string) => {
    this.events.push(item)
  }


  number = (num: string) => {
    console.log(num)
    // if (this.currentSelection == ''){
    //   this.currentSelection = num;
    //   console.log(this.currentSelection)
    // } else {
    //   this.currentSelection + num;
    //   console.log(this.currentSelection)
    // }


  }

  operator = (op: string) => {

    this.currentSelection = ''

    if (this.operators.includes(this.events[this.events.length - 1])){
      console.log(true)
      this.display = 'error'
    }else{
      console.log(false)
      this.events.push(op)
    }

    console.log(op)

    if (op == "EQUAL"){
      console.log(this.events)
    }
  }

}
