export class Slug{
    public slug: string;
    private constructor(value: string){
        this.slug = value;
    }

    static create(slug: string){
        return new Slug(slug)
    }

    /**
     * Receives a string and normalize to slug
     * @param text {string} - The text to be normalized
     * @returns 
     */
    static createFromText(text: string){
        const slugText = text
            .normalize("NFKD")
            .toLocaleLowerCase()
            .trim()
            .replace(/[^a-z0-9-]/g, "-")
            .replace(/--/g, "-")
            .replace(/-$/, "")

        return new Slug(slugText);
    }
}