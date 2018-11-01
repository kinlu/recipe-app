import {
  ComponentFixture,
  TestBed,
  async,
} from '@angular/core/testing';
import { RecipeListComponent } from './recipe-list.component';
import { RecipeService } from "./../../services/recipe.service";
import { Recipe } from "./../recipe.model";
import { Subject } from "rxjs/Subject";
import { ActivatedRoute, Router, RouterModule, Params } from "@angular/router";
import { RecipeItemComponent } from './recipe-item/recipe-item.component'
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of'

const sinon = require('sinon')

describe('RecipeList - unit tests', ()=>{
  it('should init recipes', () => {
    
    const recipe1 = sinon.createStubInstance(Recipe)
    recipe1.name = 'Recipe 1'
  
    const recipe2= sinon.createStubInstance(Recipe)
    recipe2.name = 'Recipe 2'

    const recipes = [recipe1, recipe2];

    const recipeService = sinon.createStubInstance(RecipeService, {
      getRecipes: recipes
    });

    recipeService.recipesChanged = new Subject<Recipe[]>();

    const component = new RecipeListComponent(recipeService);

    component.ngOnInit();

    expect(component.recipes.length).toEqual(2);
    expect(component.recipes[0]).toEqual(recipe1);
    expect(component.recipes[1]).toEqual(recipe2);

    expect(recipeService.called).toBeTruthy;
  })



})

describe('RecipeList - integration tests', () => {
  let fixture: ComponentFixture<RecipeListComponent>;
  let component: RecipeListComponent;
  let router;
  let params: Observable<Params>;

  beforeEach(async(() => {
    params = of({
      id: undefined
    });

    router = sinon.createStubInstance(Router);


    TestBed.configureTestingModule({
      declarations: [RecipeListComponent, RecipeItemComponent],
      providers: [
        RecipeService,
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: {params} },
      ],
      imports: [RouterModule]
    });
    fixture = TestBed.createComponent(RecipeListComponent);

    component = fixture.componentInstance;

    component.ngOnInit(); 

  }));

  it('should init a form with the existing recipe', () => {
    expect(component.recipes === []).toBe(false)
  })

})