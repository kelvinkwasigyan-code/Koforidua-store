import { z } from "zod";
import { GHANA_PHONE_REGEX, GHANA_REGIONS } from "@/lib/constants/ghana";

export const checkoutItemSchema = z.object({
  productId: z.string().cuid("Invalid product ID"),
  quantity: z
    .number({ error: "Quantity must be a valid number" })
    .int("Quantity must be a whole number")
    .min(1, "Quantity must be at least 1")
    .max(99, "Maximum quantity per item is 99"),
});

export const checkoutSchema = z
  .object({
    customerName: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must not exceed 100 characters")
      .trim(),
    customerPhone: z
      .string()
      .trim()
      .regex(GHANA_PHONE_REGEX, "Enter a valid Ghana phone number (e.g. 0241234567 or +233241234567)"),
    customerEmail: z
      .string()
      .email("Enter a valid email address")
      .trim()
      .optional()
      .or(z.literal("")),
    region: z.enum(GHANA_REGIONS, {
      error: "Select a valid Ghana region",
    }),
    city: z
      .string()
      .min(2, "City/town must be at least 2 characters")
      .max(100, "City/town must not exceed 100 characters")
      .trim(),
    shippingAddress: z
      .string()
      .min(10, "Delivery address must be at least 10 characters")
      .max(500, "Delivery address must not exceed 500 characters")
      .trim(),
    items: z
      .array(checkoutItemSchema)
      .min(1, "Cart must contain at least one item")
      .max(50, "Maximum of 50 items per order"),
  })
  .transform((data) => ({
    ...data,
    customerEmail: data.customerEmail || undefined,
  }));

export const deliveryFeeQuerySchema = z.object({
  region: z.enum(GHANA_REGIONS, {
    error: "Select a valid Ghana region",
  }),
  city: z
    .string()
    .min(2, "City/town must be at least 2 characters")
    .max(100)
    .trim(),
});

export const paystackWebhookSchema = z.object({
  event: z.string(),
  data: z.object({
    reference: z.string().min(1),
    status: z.string(),
    amount: z.number().int().positive(),
    currency: z.literal("GHS"),
    customer: z
      .object({
        email: z.string().email().optional(),
        phone: z.string().optional(),
      })
      .optional(),
  }),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type CheckoutItemInput = z.infer<typeof checkoutItemSchema>;
export type DeliveryFeeQueryInput = z.infer<typeof deliveryFeeQuerySchema>;
