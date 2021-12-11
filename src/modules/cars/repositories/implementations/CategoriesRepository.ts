import { Category } from "../../models/Category";
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
    private categories: Category[];

    private static INSTANCE: CategoriesRepository; // mesmo tipo da nossa classe

    private constructor() {
        // a partir de agora não queremos que o new CategoriesRepository() seja possível, ou seja, somente a noss classe vai poder instanciar
        this.categories = [];
    }

    public static getInstance(): CategoriesRepository {
        // esse método vai ser responsável por criar uma instancia, ou repassar uma já existente para quem requisitar

        if (!CategoriesRepository.INSTANCE) {
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }
        return CategoriesRepository.INSTANCE;
    }

    create({ name, description }: ICreateCategoryDTO): void {
        const category = new Category();
        Object.assign(category, {
            name,
            description,
            created_at: new Date(),
        });

        this.categories.push(category);
    }

    list(): Category[] {
        return this.categories;
    }

    findByName(name: string): Category {
        const category = this.categories.find(
            (category) => category.name === name
        );

        return category;
    }
}

export { CategoriesRepository };
