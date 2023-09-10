import { expect, test } from "vitest";
import { Slug } from "./slug";

test("Should be able to create a Slug from a text", ()=>{
    const slug = Slug.createFromText("Example_to-slug")

    expect(slug.slug).toBe("example-to-slug")
})