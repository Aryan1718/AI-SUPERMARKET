'use client';

const NewItemsSection = () => {
  const newItems = [
    {
      id: 1,
      name: "Organic Quinoa Bowl",
      price: "$8.99",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60",
      category: "Prepared Foods",
      description: "Fresh and healthy quinoa bowl with vegetables"
    },
    {
      id: 2,
      name: "Artisan Sourdough",
      price: "$6.99",
      image: "https://images.unsplash.com/photo-1534620808146-d33bb39128b2?w=800&auto=format&fit=crop&q=60",
      category: "Bakery",
      description: "Freshly baked artisan sourdough bread"
    },
    {
      id: 3,
      name: "Seasonal Fruit Basket",
      price: "$24.99",
      image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&auto=format&fit=crop&q=60",
      category: "Produce",
      description: "Assorted seasonal fruits"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">New Arrivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-blue-100">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  New
                </div>
              </div>
              <div className="p-6">
                <span className="text-sm text-blue-600 font-semibold">{item.category}</span>
                <h3 className="mt-1 text-xl font-medium text-gray-900">{item.name}</h3>
                <p className="mt-2 text-gray-600">{item.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">{item.price}</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewItemsSection; 