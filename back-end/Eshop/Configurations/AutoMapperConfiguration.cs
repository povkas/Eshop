using AutoMapper;
using Eshop.DTOs;
using Eshop.DTOs.CreditCards;
using Eshop.DTOs.Products;
using Eshop.DTOs.Users;
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
            CreateMap<NewProductDto, Product>(MemberList.Source);
            CreateMap<ProductDto, Product>(MemberList.Source);
            CreateMap<Product, ProductDto>(MemberList.Destination);

            CreateMap<ProductCategory, ProductCategoryDto>(MemberList.Destination);

            CreateMap<NewUserDto, User>(MemberList.Source);
            CreateMap<UserDto, User>(MemberList.Source);
            CreateMap<User, UserDto>(MemberList.Destination);

            CreateMap<CreditCard, CreditCardDto>(MemberList.Destination);
        }
    }
}