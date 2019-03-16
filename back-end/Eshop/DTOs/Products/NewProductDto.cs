﻿using Eshop.Temp;

namespace EShop.DTOs.Products
{
    public class NewProductDto
    {

        public string Title { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        //public ProductCategory Category { get; set; }
    }
}

