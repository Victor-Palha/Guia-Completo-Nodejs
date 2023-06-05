import { expect, test } from "vitest";
import { Slug } from "./slug";

test("Should be able to create a slug from a string", () => {
    const slug = Slug.createFromText("Hello World im here to stay")

    expect(slug.value).toBe("hello-world-im-here-to-stay")
})