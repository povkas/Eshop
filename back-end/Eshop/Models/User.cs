using System.ComponentModel.DataAnnotations;

namespace Eshop.Models
{
    public class User : BaseEntity
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress]
        [StringLength(255, ErrorMessage = "Email cannot exceed 255 characters")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters long")]
        [StringLength(128, ErrorMessage = "Password cannot exceed 128 characters")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Role is required")]
        public string Role { get; set; }

        [Required(ErrorMessage = "Address is required")]
        [MinLength(8, ErrorMessage = "Address must be at least 8 characters long")]
        [StringLength(128, ErrorMessage = "Address cannot exceed 255 characters")]
        public string Address { get; set; }
    }
}