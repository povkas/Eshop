using System;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
            CreateMap<User, UserDto>(MemberList.None);
        }
    }
}
