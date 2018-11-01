import {
  ComponentFixture,
  TestBed,
  async,
  discardPeriodicTasks,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppinglistService } from "./../services/shoppinglist.service";
import { Subject } from "rxjs/Subject";

const sinon = require('sinon')

describe('Shoping List unit tests', ()=>{
  it('should init recipes', () => {

    const shoppingListService = sinon.createStubInstance(ShoppinglistService)

    shoppingListService.startedEditing = new Subject<number>();

    const component = new ShoppingListComponent(shoppingListService);
    
    const index = 1;

    shoppingListService.startedEditing.subscribe({
      next: (v)=> expect(v).toEqual(index)
    })

    component.editItem(index);
  })



})