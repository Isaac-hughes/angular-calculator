import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  display:string = '';
  operators:string[] = ['+', '-', '/', 'X', 'UNDO', 'C', '.', '=']
  currentSelection:string = '';

  events:string[] =[];
  liveDisplay:string[] = [];

  pushToEvents = (item:string) => {
    this.events.push(item)
  }

  updateDisplay = () => {
    this.display = ''
    this.liveDisplay = [...this.events]
    this.liveDisplay.push(this.currentSelection)
    this.display = this.liveDisplay.join(' ')
    this.liveDisplay.splice(0, this.liveDisplay.length)

  }

  evaluate = () => {
    let order = [...this.events]
    let x = order[0]
    let num: number = +x 
    for(let i = 0; i < order.length; i++){
      if(order[i] == '+'){
        let hold = order[i + 1]
        var y: number = +hold
        num = num + y
      } else if(order[i] == '-') {
        let hold = order[i + 1]
        var y: number = +hold
        num = num - y
      } else if(order[i] == '/') {
        let hold = order[i + 1]
        var y: number = +hold
        num = num / y
      } else if(order[i] == 'X') {
        let hold = order[i + 1]
        var y: number = +hold
        num = num * y
      }
    }
    this.display = num.toString()
    this.events.splice(0, this.events.length)
  }


  number = (num: string) => {

    if (this.currentSelection == ''){
      this.currentSelection = num;
    } else {
      let holder = this.currentSelection + num;
      this.currentSelection = holder;
    }
    this.updateDisplay()
  }

  operator = async (op: string) => {
    if(op == "C"){
      console.log("C")
      this.currentSelection = ''
      this.events.splice(0, this.events.length)
      this.display = 'Cleared'


    } else if (op == "UNDO"){
      this.currentSelection = ''
      this.updateDisplay()
    } else if (op == '=') {
      await this.pushToEvents(this.currentSelection)
      this.currentSelection = ''
      console.log('equals selected', this.events)
      this.evaluate()

    } else if (this.operators.includes(this.events[this.events.length - 1])){
      console.log('error - previous event is an operator')
      this.display = 'error'
      this.currentSelection = ''
      this.events.splice(0, this.events.length)

    }else{
      await this.pushToEvents(this.currentSelection)
      this.currentSelection = ''
      await this.pushToEvents(op)
      this.updateDisplay()
    }

    
  }

}
