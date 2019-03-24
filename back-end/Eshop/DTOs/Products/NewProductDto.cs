using System.ComponentModel.DataAnnotations;

namespace EShop.DTOs.Products
{
    public class NewProductDto
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public int Quantity { get; set; }
        public byte[] Image { get; set; }
        public string Category { get; set; }
    }
}