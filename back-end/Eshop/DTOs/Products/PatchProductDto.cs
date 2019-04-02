using System.ComponentModel.DataAnnotations;

namespace Eshop.DTOs.Products
{
    public class PatchProductDto
    {
        [Required]
        public string Description { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public int Quantity { get; set; }
        public byte[] Image { get; set; }
    }
}