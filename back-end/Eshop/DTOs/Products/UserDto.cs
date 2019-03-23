using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Eshop.DTOs.Products
{
    public class UserDto
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress]
        [StringLength(255, ErrorMessage = "Email cannot exceed 255 characters")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters long")]
        [StringLength(128, ErrorMessage = "Password cannot exceed 128 characters")]
        public string Password { get; set; }
    }
}
