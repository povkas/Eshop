using System.Net;

namespace Eshop.ExceptionHandling
{
    public class InvalidCredentialsException : BaseCustomException
    {
        public InvalidCredentialsException(string message) : base(message, HttpStatusCode.Unauthorized)
        {
        }
    }
}
