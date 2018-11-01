import { RecipesComponent } from './recipes.component';
import { AppModule } from '../app.module'
import {  APP_BASE_HREF } from '@angular/common'
import {
  TestBed,
  async,
} from '@angular/core/testing';

const chai = require('chai');
const expect = chai.expect;

describe('Recipes component - integration tests', () => {

  beforeEach(async(() => {

    
    TestBed.configureTestingModule({  
      imports: [AppModule],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },

    ]
    });
    TestBed.compileComponents();
  }));

  it('should show reicpes', () => {

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


})

 