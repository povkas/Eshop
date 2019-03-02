using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace eShop_RegLog.Models
{
    public class UserAccount
    {
        [Key]
        public int UserID { get; set; }
        [Required(ErrorMessage = " Name is required ")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = " Last name is required ")]
        public string LastName { get; set; }
        [Required(ErrorMessage = " Email address is required ")]
        [EmailAddress(ErrorMessage = " PLease enter valid email address ")]
        public string Email { get; set; }
        [Required(ErrorMessage = " Country is required ")]
        public string Country { get; set; }
        [Required(ErrorMessage = " City is required ")]
        public string City { get; set; }
        [Required(ErrorMessage = "Address is required")]
        public string Address { get; set; }
        [Required(ErrorMessage = " Password is required ")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        [Compare("Password", ErrorMessage = " Please confirm your password ")]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }
    }
}
