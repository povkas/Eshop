using System.ComponentModel.DataAnnotations;

namespace Eshop.DTOs.CreditCards
{
    public class PatchCreditCardDto
    {
        [Required]
        public decimal Balance { get; set; }
    }
}
