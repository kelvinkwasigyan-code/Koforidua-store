import Image from 'next/image';

interface ProductCardProps {
    product: {
        id: string;
        name: string;
        price: number;
        imageUrl: string;
        discount?: number;
    };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const formattedPrice = new Intl.NumberFormat('en-GH', {
        style: 'currency',
        currency: 'GHS',
    }).format(product.price);

    return (
        <div className="border rounded-lg shadow-lg overflow-hidden">
            <div className="relative w-full h-48">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <div className="flex items-baseline mt-2">
                    <span className="text-xl font-bold text-gray-900">{formattedPrice}</span>
                    {product.discount && (
                        <span className="ml-2 text-sm text-red-600 line-through">
                            GH₵{(product.price / (1 - product.discount)).toFixed(2)}
                        </span>
                    )}
                </div>
                {product.discount && (
                    <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full mt-2">
                        {product.discount * 100}% Off
                    </span>
                )}
                <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
