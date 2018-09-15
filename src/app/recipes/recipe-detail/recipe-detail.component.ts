import { Params, ActivatedRoute, Router} from "@angular/router";
import { RecipeService } from "./../../services/recipe.service";
import { ShoppinglistService } from "./../../services/shoppinglist.service";
import { Recipe } from "./../recipe.model";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"]
})

export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(public shoppingListService: ShoppinglistService,
              public route: ActivatedRoute,
              public recipeService: RecipeService,
              public router: Router) { }

  ngOnInit() {
    const id = this.route.params.subscribe((params: Params) => {
    this.id = +params["id"];
    this.recipe = this.recipeService.getRecipe(this.id);
    });

    // listen and subscribe to recipe changes and update through observable
    this.recipeService.recipesChanged.subscribe(
      (recipe: Recipe[]) => {
        this.recipe = recipe[this.id];
      });
  }

  // add ingredients to shopping list
  addToShoppingList() {
    this.recipe.ingredients.forEach(ingredient => {
      this.shoppingListService.addIngredients(ingredient);
    });
    this.router.navigate(["/shopping-list"]);
  }

  // delete a recipe
  onDeleteRecipe() {
    this.recipeService.removeRecipe(this.id);
  }

}




