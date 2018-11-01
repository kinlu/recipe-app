import { RecipeEditComponent } from './recipe-edit.component';
import { RecipeService } from './../../services/recipe.service';
import { Recipe } from './../recipe.model';
import { Subject } from "rxjs/Subject";
import { of } from 'rxjs/observable/of'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  ComponentFixture,
  TestBed,
  async,
} from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

const sinon = require('sinon')

describe('RecipeEdit - edit existing recipe - unit test', () => {
  let params: Observable<Params>;
  let fixture: ComponentFixture<RecipeEditComponent>;
  let component: RecipeEditComponent;
  let recipe;
  let recipeService;
  let router;
  
  beforeEach(async(() => {
    params = of({
      id: '0'
    });

    const ingrediant1 =
    {
      name : 'ingrediant 1',
      amount: 1
    }

    const ingrediant2 =
    {
      name : 'ingrediant 2',
      amount: 1
    }

    recipe = 
    {
      name : 'Recipe 1',
      description : 'Recipe 1 description',
      imagePath : 'http://url1',
      ingredients : [ingrediant1, ingrediant2]
    }

    recipeService = sinon.createStubInstance(RecipeService);
    recipeService.getRecipe.withArgs(0).returns(recipe);
    recipeService.upDateRecipe.withArgs(0, Recipe).returns(Recipe);
    recipeService.recipesChanged = new Subject<Recipe[]>();

    router = sinon.createStubInstance(Router);
    router.navigate.withArgs(['/recipes', 0]).returnsThis();
    router.navigate.withArgs(['/recipes']).returnsThis();

    TestBed.configureTestingModule({
      declarations: [RecipeEditComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {params} },
        { provide: RecipeService, useValue: recipeService },
        { provide: Router, useValue: router }
      ],
      imports: [ReactiveFormsModule, FormsModule]
    });
    fixture = TestBed.createComponent(RecipeEditComponent);

    component = fixture.componentInstance;

    component.ngOnInit(); 

  }));

  it('should init a form with the existing recipe when passing validation', () => {
    expect(component.recipeEditForm._value.name).toEqual(recipe.name)
    expect(component.recipeEditForm._value.imagePath).toEqual(recipe.imagePath)
    expect(component.recipeEditForm._value.description).toEqual(recipe.description)
    expect(component.recipeEditForm._value.ingredients.length).toEqual(2)
  
  })

  it('should add an empty ingredient in the form', () => {
    component.onAddIngredient();
    expect(component.recipeEditForm._value.ingredients.length).toEqual(3)
  })

  it('should delete ingredient in the form', () => {
    component.deleteIngredient(1);
    expect(component.recipeEditForm._value.ingredients.length).toEqual(1)
  })

  it('should update an recipe', () => {

    component.recipeEditForm.value['ingredients'].push(
      {
        name: 'ingrediant 3',
        amount: 3
      }
    )
    
    component.onSubmit();

    expect(recipeService.upDateRecipe.called).toBe(true);
    expect(recipeService.upDateRecipe.lastCall.lastArg.ingredients.length).toBe(3)
    expect(router.navigate.calledWith(['/recipes', 0])).toBe(true)
  })

  it('should navigate back', () => {
    component.onCancel();

    expect(router.navigate.calledWith(['/recipes'])).toBe(true)

  })

})

describe('RecipeEdit - validation  - unit test', () => {
  let params: Observable<Params>;
  let fixture: ComponentFixture<RecipeEditComponent>;
  let component: RecipeEditComponent;
  let recipe;
  let recipeService;
  let router;
  
  beforeEach(async(() => {
    params = of({
      id: '0'
    });

    const ingrediant1 =
    {
      name : 'ingrediant 1',
      amount: 'XY'
    }

    const ingrediant2 =
    {
      name : 'ingrediant 2',
      amount: 1
    }

    recipe = 
    {
      name : 'Recipe 1',
      description : 'Recipe 1 description',
      imagePath : 'http://url1',
      ingredients : [ingrediant1, ingrediant2]
    }

    recipeService = sinon.createStubInstance(RecipeService);
    recipeService.getRecipe.withArgs(0).returns(recipe);
    recipeService.upDateRecipe.withArgs(0, Recipe).returns(Recipe);
    recipeService.recipesChanged = new Subject<Recipe[]>();

    router = sinon.createStubInstance(Router);
    router.navigate.withArgs(['/recipes', 0]).returnsThis();
    router.navigate.withArgs(['/recipes']).returnsThis();

    TestBed.configureTestingModule({
      declarations: [RecipeEditComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {params} },
        { provide: RecipeService, useValue: recipeService },
        { provide: Router, useValue: router }
      ],
      imports: [ReactiveFormsModule, FormsModule]
    });
    fixture = TestBed.createComponent(RecipeEditComponent);

    component = fixture.componentInstance;

    component.ngOnInit(); 

  }));

  it('should return invalid in the validator', () => {
    expect(component.recipeEditForm.status).toBe('INVALID');
  
  })

})

describe('RecipeEdit - add new recipe  - unit test', () => {
  let params: Observable<Params>;
  let fixture: ComponentFixture<RecipeEditComponent>;
  let component: RecipeEditComponent;
  // let recipe;
  let recipeService;
  let router;
  
  beforeEach(async(() => {
    params = of({
      id: undefined
    });

    recipeService = sinon.createStubInstance(RecipeService);
    recipeService.getRecipe.withArgs(0).returnsThis();
    recipeService.upDateRecipe.withArgs(0, Recipe).returnsThis();
    recipeService.recipesChanged = new Subject<Recipe[]>();

    router = sinon.createStubInstance(Router);
    router.navigate.withArgs(['/recipes', 0]).returnsThis();
    router.navigate.withArgs(['/recipes']).returnsThis();

    TestBed.configureTestingModule({
      declarations: [RecipeEditComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {params} },
        { provide: RecipeService, useValue: recipeService },
        { provide: Router, useValue: router }
      ],
      imports: [ReactiveFormsModule, FormsModule]
    });
    fixture = TestBed.createComponent(RecipeEditComponent);

    component = fixture.componentInstance;

    component.ngOnInit(); 

  }));

  it('should init a new form', () => {

    expect(component.recipeEditForm._value.name).toBeNull;
    expect(component.recipeEditForm._value.imagePath).toBeNull;
    expect(component.recipeEditForm._value.description).toBeNull;
    expect(component.recipeEditForm._value.ingredients).toBeNull;
  
  })

  it('should add an empty ingredient in the form', () => {
    component.onAddIngredient();
    expect(component.recipeEditForm._value.ingredients.length).toEqual(1)
  })

  it('should delete ingredient in the form', () => {
    component.onAddIngredient();
    component.deleteIngredient(0);
    expect(component.recipeEditForm._value.ingredients.length).toEqual(0)
  })

})

describe('RecipeEdit - edit existing recipe - integration test', () => {
  let params: Observable<Params>;
  let fixture: ComponentFixture<RecipeEditComponent>;
  let component: RecipeEditComponent;
  let router;
  
  beforeEach(async(() => {
    params = of({
      id: '0'
    });

    router = sinon.createStubInstance(Router);
    router.navigate.withArgs(['/recipes', 0]).returnsThis();
    router.navigate.withArgs(['/recipes']).returnsThis();

    TestBed.configureTestingModule({
      declarations: [RecipeEditComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {params} },
        { provide: Router, useValue: router },
        RecipeService
      ],
      imports: [ReactiveFormsModule, FormsModule]
    });
    fixture = TestBed.createComponent(RecipeEditComponent);

    component = fixture.componentInstance;

    component.ngOnInit(); 

  }));

  it('should init a form with the existing recipe', () => {
    expect(component.recipeEditForm.value.name).toBe('Chinese Chicken');
  })

  it('should add an empty ingredient in the form', () => {
    component.onAddIngredient();

    const new_ingrediaent = {
      name: 'Chinese toufu',
      amount: 5
    }
    component.recipeEditForm.value.ingredients[2].name = new_ingrediaent.name;
    component.recipeEditForm.value.ingredients[2].amount = new_ingrediaent.amount;

    component.onSubmit();

    expect(component.recipeService.getRecipe(0).ingredients[2].name).toBe(new_ingrediaent.name)

    expect(component.recipeService.getRecipe(0).ingredients[2].amount).toBe(new_ingrediaent.amount)
  })


})