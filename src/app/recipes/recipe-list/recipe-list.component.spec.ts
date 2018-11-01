import {
  ComponentFixture,
  TestBed,
  async,
  discardPeriodicTasks,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { RecipeListComponent } from './recipe-list.component';
import { RecipeService } from "./../../services/recipe.service";
import { Recipe } from "./../recipe.model";
import { Ingredient } from "./../../shared/ingredient.model";
import { Subject } from "rxjs/Subject";

const sinon = require('sinon')

describe('RecipeList unit tests', ()=>{
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

