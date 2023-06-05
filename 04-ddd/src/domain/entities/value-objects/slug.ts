export class Slug {
    public value: string
    constructor(value: string){
        this.value = value
    }

    /**
     * Receive a string and normalize it to a slug.
     * 
     * Example: "Hello World" -> "hello-world"
     * 
     * @param text {string}
     */
    static createFromText(text: string){
        const slugText = text.normalize("NFKD")
        .toLocaleLowerCase()
        .trim()
        .replace(/[^\w-]+/g, "-")
        .replace(/\s+/g, "-")
        .replace(/_/g, "-")
        .replace(/--+/g, "-")
        .replace(/-$/g, "")

        return new Slug(slugText)
    }
}