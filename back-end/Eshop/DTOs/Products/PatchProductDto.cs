using System.ComponentModel.DataAnnotations;

namespace Eshop.DTOs.Products
{
    public class PatchProductDto
    {
        [Required] public int Quantity { get; set; }
    }
}