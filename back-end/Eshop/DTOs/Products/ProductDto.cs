using System;

namespace Eshop.DTOs.Products
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        //public ProductCategory Category { get; set; }
        public DateTime Created { get; set; }
    }
}
