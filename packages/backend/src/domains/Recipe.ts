type RecipeEntity = {
	id: number;
	designation: string;
	description: string;
	dietaryPattern: string;
	createdAt: string;
	updatedAt: string;
};

type RecipeDTO = Readonly<RecipeEntity>;
