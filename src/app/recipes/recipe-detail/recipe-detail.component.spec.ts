import { RecipeDetailComponent } from './recipe-detail.component';
import { RecipeService } from './../../services/recipe.service';
import { ShoppinglistService } from './../../services/shoppinglist.service'
import { Recipe } from './../recipe.model';
import { Subject } from "rxjs/Subject";
import { of } from 'rxjs/observable/of'
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  ComponentFixture,
  TestBed,
  async,
} from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

const sinon = require('sinon')

describe('Recipe detail component', () => {
  let params: Observable<Params>;
  let fixture: ComponentFixture<RecipeDetailComponent>;
  let component: RecipeDetailComponent;
  let recipe;
  let recipeService;
  let router;
  let shoppingListService;
  
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
    recipeService.removeRecipe.withArgs(0).returnsThis;
    recipeService.recipesChanged = new Subject<Recipe[]>();

    shoppingListService = sinon.createStubInstance(ShoppinglistService);
    shoppingListService.addIngredients.returnsThis;

    router = sinon.createStubInstance(Router);
    router.navigate.withArgs(["/shopping-list"]).returnsThis();

    TestBed.configureTestingModule({
      declarations: [RecipeDetailComponent],
      providers: [
        { provide: ShoppinglistService, useValue: shoppingListService },
        { provide: ActivatedRoute, useValue: {params} },
        { provide: RecipeService, useValue: recipeService },
        { provide: Router, useValue: router }
      ],
    });
    fixture = TestBed.createComponent(RecipeDetailComponent);

    component = fixture.componentInstance;

    component.ngOnInit(); 

  }));

  it('should init the component with the given recipe', () => {

    expect(component.recipe).toEqual(recipe);
  
  });

  it('should add recipe to shopping list', () => {

    component.addToShoppingList();
    expect(shoppingListService.addIngredients.callCount).toBe(2);
    expect(router.navigate.calledWith(["/shopping-list"])).toBe(true);
  });

  it('should delete the recipe', () => {

    component.onDeleteRecipe();
    expect(recipeService.removeRecipe.calledWith(0)).toBe(true);
  });
})