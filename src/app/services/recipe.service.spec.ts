import { RecipeService } from './recipe.service';
import { TestBed } from '@angular/core/testing'
import { Recipe } from "../recipes/recipe.model";

const sinon = require('sinon')

describe('RecipeService', ()=>{
  let service: RecipeService;
  const recipe1 = sinon.createStubInstance(Recipe)
  recipe1.name = 'Recipe 1'

  const recipe2= sinon.createStubInstance(Recipe)
  recipe2.name = 'Recipe 2'

  const recipe3= sinon.createStubInstance(Recipe)
  recipe3.name = 'Recipe 3'

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipeService]
    });

    service = TestBed.get(RecipeService);

    service.setRecipes([recipe1, recipe2])
  });

  it('should have a service instance', () => {
    expect(service).toBeDefined();
  })

  it('should get recipes', () => {
    expect(service.getRecipes().length).toEqual(2);
  })

  it('should get a specfic recipe', () => {
    expect(service.getRecipe(0)).toEqual(recipe1);
    
  })

  it('should add a recipe', () => {
    service.addRecipe(recipe3);
    expect(service.getRecipes().length).toEqual(3);
    expect(service.getRecipe(2)).toEqual(recipe3);
  })

  it('should update a recipe', () => {
    service.upDateRecipe(1, recipe3);
    expect(service.getRecipes().length).toEqual(2);
  })

  it('should remove a recipe', () => {
    service.removeRecipe(1);
    expect(service.getRecipes().length).toEqual(1);
  })
})