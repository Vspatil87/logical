import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  actionSelected: number = 0;
  actionSelected2: number = 0;
  result: any;
  and: boolean = false;
  or: boolean = false;
  values: Array<boolean> = [];
  argumentList: Array<{ name: string, value: boolean }> = [
    {
      name: 'myArg',
      value: true
    }
  ];

  defaultList: Array<{ name: string, value: number | boolean }> = [
    {
      name: 'constant',
      value: 1,
    },
    {
      name: 'argument',
      value: 2,
    },
    {
      name: 'and',
      value: 3,
    },
    {
      name: 'or',
      value: 4,
    }
  ];

  list = [
    {
      actionList: this.defaultList
    }
  ];

  public addArgument() {
    this.argumentList.push({
      name: '',
      value: true
    })
  }

  public clearActionList(index: number) {
    this.list[index].actionList = this.defaultList;
  }

  appOperator() {
    this.list.push({
      actionList: this.defaultList
    })
  }

  setResult(value: any) {
    if (this.values.length > 0) {
      this.result = this.values.reduce((a, b) => {
        if (this.and) {
          return a && b;
        } else if (this.or) {
          return a || b;
        } else {
          return value;
        }
      })
    }
  }

  public changeList(index: number, value: any) {
    if (value == 'true' || value == 'false') {
      if (index == 0) {
        this.result = value;
      } else {
        this.values[index] = value;
        this.setResult(value);
      }
    }
    switch (value) {
      case '1':
        this.list[index].actionList = [
          {
            name: 'true',
            value: true,
          },
          {
            name: 'false',
            value: false,
          }
        ]
        break;

      case '2':
        this.list[index].actionList = this.argumentList;
        break;

      case '3':
        this.and = true;
        this.or = false;
        this.list[index].actionList = [
          {
            name: 'and',
            value: 3,
          },
          {
            name: 'or',
            value: 4,
          }
        ]
        this.actionSelected = 3;
        if (this.list.length < 2) {
          for (let i = 0; i < 2; i++) {
            this.list.push({
              actionList: this.defaultList
            })
          }
        }
        this.setResult(value);
        break;

      case '4':
        this.or = true;
        this.and = false;
        this.list[index].actionList = [
          {
            name: 'and',
            value: 3,
          },
          {
            name: 'or',
            value: 4,
          }
        ]
        this.actionSelected = 4;
        if (this.list.length < 2) {
          for (let i = 0; i < 2; i++) {
            this.list.push({
              actionList: this.defaultList
            })
          }
        }
        this.setResult(value);
        break;
    }

  }

  setArgumentName(value: any, index: number, identifier: string) {
    if (this.values.length < 2) {
      this.result = value;
    }
    if (identifier == 'input') {
      this.argumentList[index].name = value;
    } else {
      this.argumentList[index].value = value;
    }
  }
}
