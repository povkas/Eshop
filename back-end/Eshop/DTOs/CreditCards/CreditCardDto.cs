﻿namespace Eshop.DTOs.CreditCards
{
    public class CreditCardDto
    {
        public int Id { get; set; }
        public string Number { get; set; }
        public string ExpirationDate { get; set; }
        public int SecurityCode { get; set; }
    }
}