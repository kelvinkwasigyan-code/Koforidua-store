import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const productFeatureSchema = z.object({
  label: z.string().min(1, "Feature label is required").max(100),
  value: z.string().min(1, "Feature value is required").max(255),
});

const baseProductFields = {
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(200, "Product name must not exceed 200 characters")
    .trim(),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .max(200, "Slug must not exceed 200 characters")
    .regex(slugRegex, "Slug must be lowercase alphanumeric with hyphens only")
    .trim(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(5000, "Description must not exceed 5000 characters")
    .trim(),
  price: z
    .number({ error: "Price must be a valid number" })
    .positive("Price must be greater than zero")
    .max(1_000_000, "Price exceeds maximum allowed value"),
  stockQuantity: z
    .number({ error: "Stock quantity must be a valid number" })
    .int("Stock quantity must be a whole number")
    .min(0, "Stock quantity cannot be negative"),
  categoryId: z.string().cuid("Invalid category ID"),
  images: z
    .array(z.string().url("Each image must be a valid URL"))
    .min(1, "At least one product image is required")
    .max(10, "Maximum of 10 images allowed"),
  features: z.array(productFeatureSchema).max(20, "Maximum of 20 features allowed").default([]),
  lowStockThreshold: z
    .number({ error: "Low stock threshold must be a valid number" })
    .int("Low stock threshold must be a whole number")
    .min(0, "Low stock threshold cannot be negative")
    .default(5),
};

export const createProductSchema = z.object(baseProductFields);

export const updateProductSchema = createProductSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  { message: "At least one field must be provided for update" },
);

export const adjustStockSchema = z.object({
  productId: z.string().cuid("Invalid product ID"),
  adjustment: z
    .number({ error: "Adjustment must be a valid number" })
    .int("Adjustment must be a whole number")
    .refine((val) => val !== 0, "Adjustment cannot be zero"),
});

export const productQuerySchema = z.object({
  search: z.string().trim().max(100).optional(),
  categoryId: z.string().cuid().optional(),
  categorySlug: z.string().trim().optional(),
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  inStock: z
    .enum(["true", "false"])
    .transform((val) => val === "true")
    .optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.enum(["price", "name", "createdAt"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const productIdParamSchema = z.object({
  id: z.string().cuid("Invalid product ID"),
});

export const productSlugParamSchema = z.object({
  slug: z
    .string()
    .min(2)
    .regex(slugRegex, "Invalid product slug"),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type AdjustStockInput = z.infer<typeof adjustStockSchema>;
export type ProductQueryInput = z.infer<typeof productQuerySchema>;
export type ProductFeature = z.infer<typeof productFeatureSchema>;
