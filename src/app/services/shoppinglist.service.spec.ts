import { ShoppinglistService } from './shoppinglist.service';
import { TestBed } from '@angular/core/testing'
import { Ingredient } from "../shared/ingredient.model";

const sinon = require('sinon');

describe('Shopping List Service', () => {
  let service: ShoppinglistService;

  const ingrediant1 = sinon.createStubInstance(Ingredient);
  ingrediant1.name = 'ingrediant 1';
  const ingrediant2 = sinon.createStubInstance(Ingredient);
  ingrediant2.name = 'ingrediant 2';
  const ingrediant3 = sinon.createStubInstance(Ingredient);
  ingrediant3.name = 'ingrediant 3';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppinglistService]
    });

    service = TestBed.get(ShoppinglistService);

    service.ingredients = [ingrediant1, ingrediant2];
  });

  it('should have a service instance', () => {
    expect(service).toBeDefined();
  })

  it('should get an ingredient', () => {
    expect(service.getIngredient(0)).toEqual(ingrediant1);
  })

  it('should add an ingredient', () => {
    service.addIngredients(ingrediant3);
    expect(service.getIngredient(2)).toEqual(ingrediant3);
  })

  it('should edit an ingredient', () => {
    service.editIngredient(1, ingrediant3);
    expect(service.getIngredient(1)).toEqual(ingrediant3);
  })

  it('should delete an ingredient', () => {

    service.deleteIngredient(1);
    expect(service.ingredients.length).toEqual(1);
  })
})