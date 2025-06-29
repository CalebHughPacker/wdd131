import recipes from './recipes.mjs';
    
function random(num) {
	return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
	const listLength = list.length;
	const randomNum = random(listLength);
	return list[randomNum];
}

function tagsTemplate(tags) {
	return tags
		.map(tag => `<button class="tag">${tag}</button>`)
		.join('');
}

function ratingTemplate(rating) {
	let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
	const fullStars = Math.floor(rating);
	const halfStar = rating % 1 >= 0.5;
	for (let i = 0; i < 5; i++) {
		if (i < fullStars) {
			html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
		} else if (i === fullStars && halfStar) {
			html += `<span aria-hidden="true" class="icon-star-half">⭐</span>`;
		} else {
			html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
		}
	}
	html += `</span>`;
	return html;
}

function recipeTemplate(recipe) {
	return `
		<section class="recipe">
			<img src="${recipe.image}" alt="${recipe.name}">
			<div class="information">
				<div class="tags">
					${tagsTemplate(recipe.tags)}
				</div>
				<h2 class="name">${recipe.name}</h2>
				${ratingTemplate(recipe.rating)}
				<p class="description">${recipe.description}</p>
			</div>
		</section>
	`;
}


function renderRecipes(recipeList) {
	const container = document.querySelector('.recipe-container');
	container.innerHTML = recipeList.map(recipeTemplate).join('');
}

function filterRecipes(query) {
	return recipes
		.filter(recipe => {
			const lowerQuery = query.toLowerCase();
			return (
				recipe.name.toLowerCase().includes(lowerQuery) ||
				recipe.description.toLowerCase().includes(lowerQuery) ||
				(recipe.tags && recipe.tags.find(tag => tag.toLowerCase().includes(lowerQuery))) ||
				(recipe.recipeIngredient && recipe.recipeIngredient.find(ing => ing.toLowerCase().includes(lowerQuery)))
			);
		})
		.sort((a, b) => a.name.localeCompare(b.name));
}

function searchHandler(event) {
	event.preventDefault();
	const query = document.getElementById('search').value.trim().toLowerCase();
	if (query.length === 0) {
		init(); 
	} else {
		const filtered = filterRecipes(query);
		renderRecipes(filtered);
	}
}

function init() {
	const recipe = getRandomListEntry(recipes);
	renderRecipes([recipe]);
}

document.addEventListener('DOMContentLoaded', () => {
	init();
	document.getElementById('search-button').addEventListener('click', searchHandler);
});
