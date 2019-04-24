using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Eshop.DTOs.CreditCards
{
    public class PatchCreditCardDto
    {
        [Required]
        public decimal Balance { get; set; }
    }
}
