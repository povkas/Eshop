using AutoMapper;
using Eshop.DTOs;
using Eshop.DTOs.Products;
using Eshop.Models;
using EShop.DTOs.Products;

namespace Eshop.Configurations
{
    public class AutoMapperConfiguration : Profile
    {
        public AutoMapperConfiguration() : this("E-shop")
        {
        }

        protected AutoMapperConfiguration(string name) : base(name)
        {
            CreateMap<NewProductDto, Product>(MemberList.None);
            CreateMap<ProductDto, Product>(MemberList.None);
            CreateMap<Product, ProductDto>(MemberList.Destination);

            CreateMap<ProductCategory, ProductCategoryDto>(MemberList.Destination);
        }
    }
}