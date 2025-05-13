type RecipeEntity = {
	id: number;
	designation: string;
	description: string;
	dietaryPattern: string;
	createdAt: string;
	updatedAt: string;
};

type RecipeDTO = Readonly<RecipeEntity>;

const recipeDTOMapper = (entity: RecipeEntity): RecipeDTO => {
	return {
		id: entity.id,
		designation: entity.designation,
		description: entity.description,
		dietaryPattern: entity.dietaryPattern,
		createdAt: entity.createdAt,
		updatedAt: entity.updatedAt,
	};
};

export { type RecipeEntity, type RecipeDTO, recipeDTOMapper };
