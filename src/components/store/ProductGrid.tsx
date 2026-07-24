import ProductCard from "./ProductCard";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    imageUrl: string;
}

const mockProducts: Product[] = [
    {
        id: "1",
        name: "Smartphone X",
        description: "Latest model with advanced features.",
        price: 3500,
        currency: "GH₵",
        imageUrl: "/images/smartphone_x.jpg",
    },
    {
        id: "2",
        name: "Wireless Earbuds",
        description: "High-fidelity sound, comfortable fit.",
        price: 450,
        currency: "GH₵",
        imageUrl: "/images/earbuds.jpg",
    },
    {
        id: "3",
        name: "Smartwatch Pro",
        description: "Track your fitness and stay connected.",
        price: 1200,
        currency: "GH₵",
        imageUrl: "/images/smartwatch_pro.jpg",
    },
    {
        id: "4",
        name: "Portable Bluetooth Speaker",
        description: "Powerful sound, long-lasting battery.",
        price: 700,
        currency: "GH₵",
        imageUrl: "/images/bluetooth_speaker.jpg",
    },
    {
        id: "5",
        name: "Laptop Z",
        description: "Ultra-thin and powerful for all your needs.",
        price: 8000,
        currency: "GH₵",
        imageUrl: "/images/laptop_z.jpg",
    },
    {
        id: "6",
        name: "Gaming Console",
        description: "Next-gen gaming experience.",
        price: 4000,
        currency: "GH₵",
        imageUrl: "/images/gaming_console.jpg",
    },
    {
        id: "7",
        name: "External SSD 1TB",
        description: "Fast and reliable storage solution.",
        price: 900,
        currency: "GH₵",
        imageUrl: "/images/external_ssd.jpg",
    },
    {
        id: "8",
        name: "Drone with 4K Camera",
        description: "Capture stunning aerial footage.",
        price: 2500,
        currency: "GH₵",
        imageUrl: "/images/drone.jpg",
    },
];

export default function ProductGrid() {
    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {mockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
