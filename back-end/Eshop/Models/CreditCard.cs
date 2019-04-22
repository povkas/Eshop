namespace Eshop.Models
{
    public class CreditCard : BaseEntity
    {
        public string Number { get; set; }
        public string ExpirationDate { get; set; }
        public int SecretCode { get; set; }
        public decimal Balance { get; set; }
    }
}

