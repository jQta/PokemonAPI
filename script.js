const allPoke = []

const gallery$$ = document.querySelector(".b-gallery");
const input$$ = document.querySelector('input');
const GottaCatchEmAll$$ = document.querySelector('.b-pokeball');

const arrayPoke = async () => {

    if (allPoke.length === 0) {
        for (let i = 1; i <= 151; i++) {
            const baseData = `https://pokeapi.co/api/v2/pokemon/${i}`;
            const rawPokemons = await fetch(baseData);
            const formattedPokemons = await rawPokemons.json();
            allPoke.push(formattedPokemons);
        }
    }

    printPokemon(allPoke);
}

input$$.addEventListener('input', () => printPokemon(allPoke));

const printPokemon = (pokemons) => {
    gallery$$.innerHTML = "";
    for (let pokemon of pokemons) {

        filterName = pokemon.name.toLowerCase().includes(input$$.value.toLowerCase());
        filterMainType = pokemon.types[0].type.name.toLowerCase().includes(input$$.value.toLowerCase());
        filterSecondType = pokemon.types[1]?.type.name.toLowerCase().includes(input$$.value.toLowerCase());

        if (filterName || filterMainType || filterSecondType) {
            const figure$$ = document.createElement("figure");
            const title$$ = document.createElement("h2");
            const image$$ = document.createElement("img");
            const description$$ = document.createElement("div");
            const profile$$ = document.createElement("div");
            const height$$ = document.createElement("p");
            const weight$$ = document.createElement("p");
            const types$$ = document.createElement("div");
            const typeMain$$ = document.createElement("p");
            const typesMinor$$ = document.createElement("p");

            figure$$.className = "b-card";
            description$$.className = "b-profile";
            profile$$.className = "b-profile__stats";
            types$$.className = "b-profile__type";

            title$$.textContent = pokemon.name;
            image$$.src = pokemon.sprites.back_default;
            image$$.alt = pokemon.name;
            height$$.textContent = "Height: " + pokemon.height * 10 + " cm";
            weight$$.textContent = "Weight: " + pokemon.weight / 10 + " Kg";
            typeMain$$.textContent = pokemon.types[0].type.name;
            typesMinor$$.textContent = pokemon.types[1]?.type.name;

            figure$$.appendChild(title$$);
            figure$$.appendChild(image$$);
            description$$.appendChild(profile$$);
            description$$.appendChild(types$$);
            profile$$.appendChild(height$$);
            profile$$.appendChild(weight$$);
            types$$.appendChild(typeMain$$);
            types$$.appendChild(typesMinor$$);

            figure$$.appendChild(description$$);
            gallery$$.appendChild(figure$$);

            switch (pokemon.types[0].type.name) {
                case "fire": figure$$.className = "b-card b-card__fire";
                    break;
                case "water": figure$$.className = "b-card  b-card__water";
                    break;
                case "grass": figure$$.className = "b-card  b-card__grass";
                    break;
                case "electric": figure$$.className = "b-card  b-card__electric";
                    break;
                case "ghost": figure$$.className = "b-card  b-card__ghost";
                    break;
                case "psychic": figure$$.className = "b-card  b-card__psychic";
                    break;
                case "rock": figure$$.className = "b-card  b-card__rock";
                    break;
                case "ground": figure$$.className = "b-card  b-card__ground";
                    break;
                case "fighting": figure$$.className = "b-card  b-card__fighting";
                    break;
                case "poison": figure$$.className = "b-card  b-card__poison";
                    break;
            }

            function GottaCatchEmAll() {
                image$$.src = pokemon.sprites.front_default;
            }

            GottaCatchEmAll$$.addEventListener('click', GottaCatchEmAll);
        }
    }
};

arrayPoke();
