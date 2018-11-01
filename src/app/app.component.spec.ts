import { RecipesComponent } from './recipes/recipes.component';
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { AppModule } from './app.module'
import {  APP_BASE_HREF } from '@angular/common'
import {
  TestBed,
  async,
} from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

const chai = require('chai');
const expect = chai.expect;

describe('Application integration tests', () => {

  beforeEach(async(() => {

    
    TestBed.configureTestingModule({  
      imports: [AppModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },

    ]
    });
    TestBed.compileComponents();
  }));

  it('Recipe test - should show reicpes', () => {

    const component = TestBed.createComponent(RecipesComponent);
    const recipes = [
      "Chinese Chicken",
      "Sausage Casserole",
      "Taco Meat Recipe",
      "Egg delight",
      "Fried EggPlant",
    ]


    component.detectChanges()
    expect(component.debugElement.nativeElement.querySelectorAll('.media-heading').length).to.equal(5);

    component.debugElement.nativeElement.querySelectorAll('.media-heading').forEach(function(cur, ind){
      expect(cur.innerText).to.equal(recipes[ind])
    })
  });

  it('Recipe test - should show a blank edit recipe form for new recipe', () => {
    const component = TestBed.createComponent(RecipeEditComponent);

    component.detectChanges();
    expect(component.debugElement.nativeElement.querySelector('#subject').innerText).to.equal('Edit Recipe');

    expect(component.debugElement.nativeElement.querySelector('#name').value).to.equal('');

    expect(component.debugElement.nativeElement.querySelector('#imagePath').value).to.equal('');

    expect(component.debugElement.nativeElement.querySelector('#desription').value).to.equal('');

    expect(component.debugElement.nativeElement.querySelector('#ingredient_subject').innerText).to.equal('Ingredients')

  })

})

 