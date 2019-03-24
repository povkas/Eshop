using System;

namespace Eshop.Models
{
    public class Product : BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public DateTime Created { get; set; }
        //public string Category { get; set; }
        public byte[] Image { get; set; }
    }
}