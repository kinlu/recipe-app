import { ShoppingEditComponent } from './shopping-edit.component';
import { ShoppinglistService } from './../../services/shoppinglist.service'
import { Ingredient } from "./../../shared/ingredient.model";
import { Subject } from "rxjs/Subject";
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  ComponentFixture,
  TestBed,
  async,
} from '@angular/core/testing';

const sinon = require('sinon')

describe('Shopping Edit - unit test', () => {

  let fixture: ComponentFixture<ShoppingEditComponent>;
  let component: ShoppingEditComponent;
  let shoppingListService;
  let ingredient: Ingredient;
  
  
  beforeEach(async(() => {

    ingredient = <Ingredient>{
      name : 'ingredient 1',
      amount: 1
    }

    shoppingListService = sinon.createStubInstance(ShoppinglistService);
    shoppingListService.addIngredients.returnsThis;
    shoppingListService.editIngredient.returnsThis;
    shoppingListService.deleteIngredient.returnsThis;
    shoppingListService.getIngredient.withArgs(0).returns(ingredient);
    shoppingListService.startedEditing = new Subject<number>();

    TestBed.configureTestingModule({
      declarations: [ShoppingEditComponent],
      providers: [
        { provide: ShoppinglistService, useValue: shoppingListService },
      ],
      imports: [ReactiveFormsModule, FormsModule]
    });

    fixture = TestBed.createComponent(ShoppingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      component.ngOnInit(); 
    })

  }));

  it('should init a form with values when start editing', ()=>{

    shoppingListService.startedEditing.next(0);
    
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      expect(component.editedItemIndex).toBe(0);
      expect(component.editMode).toBe(true);
      expect(component.editedItem.name).toBe(ingredient.name);
      expect(component.editedItem.amount).toBe(ingredient.amount);
      expect(component.slForm.value.name).toBe(ingredient.name);
      expect(component.slForm.value.amount).toBe(ingredient.amount);
    })

  });

  it('should edit an ingredient when the editMode is on', ()=>{

    shoppingListService.startedEditing.next(0);
    
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      component.addIngredients(component.slForm);

      expect(shoppingListService.editIngredient.called).toBe(true)
      expect(shoppingListService.editIngredient.args.flat()[1].name).toBe(ingredient.name);
      expect(shoppingListService.editIngredient.args.flat()[1].amount).toBe(ingredient.amount);
      
      fixture.detectChanges();
      fixture.whenStable().then(()=>{
        expect(component.slForm.value).toBeNull;
        expect(component.editMode).toBe(false)
      })
      
    })
  });
  
  it('should add an ingredient when the editMode is off', ()=>{

    shoppingListService.startedEditing.next(0);
    component.editMode = false;

    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      component.addIngredients(component.slForm);

      expect(shoppingListService.addIngredients.called).toBe(true)
      expect(shoppingListService.addIngredients.args.flat()[0].name).toBe(ingredient.name);
      expect(shoppingListService.addIngredients.args.flat()[0].amount).toBe(ingredient.amount);
      
      fixture.detectChanges();
      fixture.whenStable().then(()=>{
        expect(component.slForm.value).toBeNull;
        expect(component.editMode).toBe(false)
      })
    })
  });

  it('should edit an ingredient when the editMode is on', ()=>{

    shoppingListService.startedEditing.next(0);
    
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      component.onDelete();
      expect(shoppingListService.deleteIngredient.called).toBe(true)
      expect(shoppingListService.deleteIngredient.args.flat()[0]).toBe(0);

      fixture.detectChanges();
      fixture.whenStable().then(()=>{
        expect(component.slForm.value).toBeNull;
        expect(component.editMode).toBe(false)
      })
    })
  });

  afterEach(()=>{
    component.ngOnDestroy();
  })
})

describe('Shopping Edit - integration test', () => {

  let fixture: ComponentFixture<ShoppingEditComponent>;
  let component: ShoppingEditComponent;
  let ingredient: Ingredient;
  
  
  beforeEach(async(() => {

    ingredient = <Ingredient>{
      name : 'ingredient 1',
      amount: 1
    }

    TestBed.configureTestingModule({
      declarations: [ShoppingEditComponent],
      providers: [
        ShoppinglistService,
      ],
      imports: [ReactiveFormsModule, FormsModule]
    });

    fixture = TestBed.createComponent(ShoppingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      component.ngOnInit(); 
    })

  }));

  it('should init a form with values when start editing', ()=>{
    component.shoppinglistService.addIngredients(ingredient);
    component.shoppinglistService.startedEditing.next(0);
    
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      expect(component.editedItemIndex).toBe(0);
      expect(component.editMode).toBe(true);
      expect(component.editedItem.name).toBe(ingredient.name);
      expect(component.editedItem.amount).toBe(ingredient.amount);
      expect(component.slForm.value.name).toBe(ingredient.name);
      expect(component.slForm.value.amount).toBe(ingredient.amount);
    })

  });

  it('should add an ingredient when the editMode is off', ()=>{
    component.shoppinglistService.addIngredients(ingredient);
    component.shoppinglistService.startedEditing.next(0);
    component.editMode = false;

    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      component.addIngredients(component.slForm);
      expect(component.shoppinglistService.getIngredient(0).amount).toBe(ingredient.amount)
      expect(component.shoppinglistService.getIngredient(0).name).toBe(ingredient.name)
      fixture.detectChanges();
      fixture.whenStable().then(()=>{
        expect(component.slForm.value).toBeNull;
        expect(component.editMode).toBe(false)
      })
    })
  });

  it('should add an ingredient when the editMode is off', ()=>{
    component.shoppinglistService.addIngredients(ingredient);
    component.shoppinglistService.startedEditing.next(0);
    component.editMode = false;

    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      component.addIngredients(component.slForm);
      expect(component.shoppinglistService.getIngredient(0).amount).toBe(ingredient.amount)
      expect(component.shoppinglistService.getIngredient(0).name).toBe(ingredient.name)
      fixture.detectChanges();
      fixture.whenStable().then(()=>{
        expect(component.slForm.value).toBeNull;
        expect(component.editMode).toBe(false)
      })
    })
  });

})