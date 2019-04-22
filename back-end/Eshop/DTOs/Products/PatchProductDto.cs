using System.ComponentModel.DataAnnotations;

namespace Eshop.DTOs.Products
{
    public class PatchProductDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        [Required]
        public int Quantity { get; set; }
        public byte[] Image { get; set; }
        public string Category { get; set; }
    }
}