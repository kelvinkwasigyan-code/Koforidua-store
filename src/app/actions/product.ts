"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
}

export async function createProduct(formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const imageUrl = formData.get("imageUrl") as string;
    const categoryId = formData.get("categoryId") as string;

    if (!name || isNaN(price) || !categoryId) {
        throw new Error("Product name, valid price, and category are required.");
    }

    const slug = slugify(name);

    await prisma.product.create({
        data: {
            name,
            slug,
            description,
            price,
            images: imageUrl ? [imageUrl] : [],
            categoryId,
        },
    });

    revalidatePath("/admin/products");
    redirect("/admin/products");
}
